import { ResetPasswordPage } from './../registration/reset-password/reset-password';
import { PaymentPage } from '../activate/payment/payment';
// import { ProcessingPage } from '../activate/processing/processing';
import { DashboardPage } from '../dashboard/index/index';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserAPI } from '../../api/UserAPI';
import { TLoginResponse } from '../../model/types';
import { ProfileModel } from '../../model/ProfileModel';
import { LoggedInStatus } from '../../api/Comms';

const cookieTimes = 60 * 60;

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

	public credentialsForm: FormGroup;
	public loginError: boolean = false;

	constructor(
		public navController: NavController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public translate: TranslateService,
		public alertCtrl: AlertController,
		private profile: ProfileModel) {

		this.credentialsForm = this.formBuilder.group({
			registration_id: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ionViewDidLoad() {
		//setTimeout(() => this.navController.push(DashboardPage), 1000); // this is only for testing
	}

  	public onSignIn() {
		if (this.credentialsForm.invalid) {
			this.loginError = true;
			return;
		}

		const registration_id = this.credentialsForm.controls.registration_id.value;
		const password = this.credentialsForm.controls.password.value;


		const requestData = {
			registration_id,
			password,
			seconds: cookieTimes.toString(),
			username: registration_id // default wants to use username
		}

		UserAPI.userLogin(requestData)
			.then((result: TLoginResponse) => {
				console.log(result);

				if (result.status == 'ok') {
					this.profile.setUserInfo(result.cookie, result.user)
					this.goToPageBasedOnUserStatus(result.user.logged_in_status)
					console.log(this.profile)
				} else {
					this.verifyEmail(result.error)
				}

			},(error: any) => {
				console.log(error);
			});
	}

	private goToPageBasedOnUserStatus (status) {
		if (LoggedInStatus.PENDING === status) {
			this.navController.push(PaymentPage);
		} else {
			this.navController.push(DashboardPage);
		}
		// if (regID == 101 && password == 101) {
		// 	this.navController.push(ProcessingPage); // no status for processing page yet
		// } else if (regID == 102 && password == 102) {
		// 	this.navController.push(DashboardPage);
		// } else {
		// 	this.navController.push(PaymentPage);
		// }
	}

	private verifyEmail (message) {
		const lang = this.translate.currentLang || this.translate.defaultLang
		const alert = this.alertCtrl.create({
			message: message[0],
			buttons: [{
				text: this.translate.translations[lang].GLOBA_CANCEL_BUTTON_LABEL
			}],
			cssClass: 'verify-email-alert'
		})

		alert.present()
	}

	public onForgotPassword() {
		this.navController.push(ResetPasswordPage);
	}
}
