import { DashboardPage } from '../dashboard/index/index';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, IonicApp } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserAPI } from '../../api/UserAPI';
import { TLoginResponse } from '../../model/types';
import { ProfileModel } from '../../model/ProfileModel';
import { LoggedInStatus } from '../../api/Comms';
import { ProcessingPage } from '../activate/processing/processing';
import { isDebug } from '../../utils/url-util';
import { getTranslation } from '../../utils/Data-Fetch';
import { ForgetPasswordPage } from '../registration/forget-password';
import { HTTP } from '@ionic-native/http';

const cookieTimes = 60 * 60;
const localStorageIDName = 'myInsurBox_ID';

@Component({
	selector: 'login',
	templateUrl: 'login.html'
})
export class LoginPage {

	public credentialsForm: FormGroup;
	public errorMsg: string = '';
	private timer: any = null;
	public appVersion: string = '';

	constructor(
		public navController: NavController,
		public navParams: NavParams,
		public ionicApp: IonicApp,
		private formBuilder: FormBuilder,
		public translate: TranslateService,
		private profile: ProfileModel,
		private viewCtrl: ViewController,
		private alertCtrl: AlertController,
		private nativeHttp: HTTP) {

		const username = this.getUserName() || ''
		this.credentialsForm = this.formBuilder.group({
			registration_id: [username, Validators.required],
			password: ['', Validators.required],
			saveRegistrationId: [false]
		});
	}

	ionViewDidLoad() {
		isDebug() && setTimeout(() => this.onSignIn(), 1000); // this is only for testing
		//this.getData();
		this.getAppVersion();	
	}

	public onSignIn() {
		let registration_id = ''
		let password = ''

		if (isDebug()){
			// registration_id = 'PIBAxxx';
			// password = 'lulu1234';
			registration_id = 'cib999';
			password = 'password';

		} else {
			if (this.credentialsForm.invalid) {
				this.errorMsg = getTranslation(this.translate, 'LOGIN.ERROR_GENERAL');
				return;
			}

			registration_id = this.credentialsForm.controls.registration_id.value;
			password = this.credentialsForm.controls.password.value;

			const isSave = this.credentialsForm.controls.saveRegistrationId.value
			isSave === true && this.saveUserName(registration_id)
		}

		const requestData = {
			registration_id,
			password,
			seconds: cookieTimes.toString(),
			username: registration_id // default wants to use username
		}

		UserAPI.userLogin(requestData)
			.then((result: TLoginResponse) => {
				if (result.status == 'ok') {
					this.profile.setUserInfo(result.cookie, result.user)
					this.goToPageBasedOnUserStatus(result.user.logged_in_status)
					this.setExpireTimer()
				} else {
					this.errorMsg = result.error;
				}
			},(error: any) => {
				console.log(error);
			});
	}

	private goToPageBasedOnUserStatus (status) {

		switch (status) {
			case LoggedInStatus.PROCESSING:
			case LoggedInStatus.PENDING:
				this.navController.push(ProcessingPage);
			break;

			case LoggedInStatus.APPROVED:
				this.navController.push(DashboardPage);
			break;

			default:
				this.navController.push(DashboardPage);
			break;
		}
	}

	public onForgotPassword() {
		this.navController.push(ForgetPasswordPage);
	}

	public saveUserName(registrationId) {
		localStorage.setItem(localStorageIDName, registrationId)
	}

	public getUserName () {
		return localStorage.getItem(localStorageIDName)
	}

	public getData () {
		const testUrl = 'https://api.myinsurbox.com/index.php/api/es/test/'
		this.nativeHttp.get(testUrl, {}, {}).then(data =>{
			console.log ('test native',data)
		});
	}

	public setLanguage(lan:string):void {
		this.translate.use(lan);
	}

	private setExpireTimer () {
		this.timer && clearTimeout(this.timer)
		this.timer = setTimeout(this.showExpired.bind(this), cookieTimes * 1000)
	}

	private showExpired() {
		// todo, if ok button not been click, then it will be redirect as well.
		const alert = this.alertCtrl.create({
			message:getTranslation(this.translate, 'EXPIRED_MESSAGE'),
			buttons: [{
				text: getTranslation(this.translate, 'GLOBA_OK_BUTTON_LABEL'),
				handler: () => {
					this.expiredHandler()
				}
			}]
		})
		alert.present()
	}

	private expiredHandler () {
		this.viewCtrl.dismiss().then(_=>{
			let activePortal = this.ionicApp._modalPortal.getActive()
			if (activePortal) {
				activePortal.dismiss(); //can use another .then here
			}
		});
		UserAPI.logout(this.profile.cookie)
			.then((result: any) => {
				result.status !== 'ok' && console.log (result);
				this.navController.push (LoginPage)
			}, (error: any) => {
				this.navController.push (LoginPage)
				console.log (error);
			});
	}

	public goToRegister () {
		window.open("https://registry.myinsurbox.com/#/welcome",'_system', 'location=yes');
	}

	public getAppVersion() {
		var xhr = new XMLHttpRequest();
		let _this = this;
		xhr.addEventListener("load", function () {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "application/xml");
			_this.appVersion = doc.getElementsByTagName("widget")[0].getAttribute("version")
			
		});
		xhr.open("get", "../config.xml", true);
		xhr.send();
	}

}
