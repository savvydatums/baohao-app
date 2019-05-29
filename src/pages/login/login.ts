import { PaymentPage } from '../activate/payment/payment';
import { DashboardPage } from '../dashboard/index/index';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserAPI } from '../../api/UserAPI';
//import { TLoginResponse } from '../../model/types';
import { ProfileModel } from '../../model/ProfileModel';
import { LoggedInStatus } from '../../api/Comms';
import { ProcessingPage } from '../activate/processing/processing';
import { isDebug } from '../../utils/url-util';
import { getTranslation } from '../../utils/Data-Fetch';
import { ForgetPasswordPage } from '../registration/forget-password';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';

const cookieTimes = 60 * 60;

@Component({
	selector: 'login',
	templateUrl: 'login.html'
})
export class LoginPage {

	public credentialsForm: FormGroup;
	public errorMsg: string = '';

	constructor(
		public navController: NavController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public translate: TranslateService,
		private profile: ProfileModel,
		private nativeHttp: HTTP) {

		this.credentialsForm = this.formBuilder.group({
			registration_id: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ionViewDidLoad() {
		isDebug() && setTimeout(() => this.onSignIn(), 1000); // this is only for testing
		this.getData();
	}

	public onSignIn() {
		let registration_id = ''
		let password = ''

		if (isDebug()){
			// registration_id = 'PIBAxxx';
			// password = 'lulu1234';
			registration_id = 'jimmytest';
			password = 'password';

		} else {
			if (this.credentialsForm.invalid) {
				this.errorMsg = getTranslation(this.translate, 'LOGIN.ERROR_GENERAL');
				return;
			}

			registration_id = this.credentialsForm.controls.registration_id.value;
			password = this.credentialsForm.controls.password.value;
		}

		const requestData = {
			registration_id,
			password,
			seconds: cookieTimes.toString(),
			username: registration_id // default wants to use username
		}

		const onSuccess = (result) => {
			this.profile.setUserInfo(result.cookie, result.user)
			this.goToPageBasedOnUserStatus(result.user.logged_in_status)
		}
		// TODO: error should show up
		const onError = (error) => { console.log(error); }
		UserAPI.userLogin(requestData, onSuccess.bind(this), onError.bind(this))

		// UserAPI.userLogin(requestData)
		// 	.then((result: TLoginResponse) => {
		// 		console.log('userAPi result', result.status);
		// 		if (result.status == 'ok') {
		// 			this.profile.setUserInfo(result.cookie, result.user)
		// 			this.goToPageBasedOnUserStatus(result.user.logged_in_status)
		// 		} else {
		// 			this.errorMsg = result.error;
		// 		}
		// 	},(error: any) => {
		// 		console.log(error);
		// 	});
	}

	private goToPageBasedOnUserStatus (status) {

		switch (status) {
			case LoggedInStatus.PENDING:
				this.navController.push(PaymentPage);
			break;

			case LoggedInStatus.PROCESSING:
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

	public getData () {
		const testUrl = 'https://api.myinsurbox.com/index.php/api/es/test/'
		this.nativeHttp.get(testUrl, {}, {}).then(data =>{
			console.log ('test native',data.status)
			console.log ('test native',data.data)
			console.log ('test native',data.headers)
		});
	}
}
