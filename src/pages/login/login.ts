import { ResetPasswordPage } from './../registration/reset-password/reset-password';
import { PaymentPage } from '../activate/payment/payment';
import { DashboardPage } from '../dashboard/index/index';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserAPI } from '../../api/UserAPI';
import { TLoginResponse } from '../../model/types';
import { ProfileModel } from '../../model/ProfileModel';
import { LoggedInStatus } from '../../api/Comms';
import { ProcessingPage } from '../activate/processing/processing';
import { isDebug } from '../../utils/url-util';
import { getTranslation } from '../../utils/Data-Fetch';

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
		private profile: ProfileModel) {

		this.credentialsForm = this.formBuilder.group({
			registration_id: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ionViewDidLoad() {
		isDebug() && setTimeout(() => this.onSignIn(), 1000); // this is only for testing
	}

	public onSignIn() {
		let registration_id = ''
		let password = ''

		if (isDebug()){
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

		UserAPI.userLogin(requestData)
			.then((result: TLoginResponse) => {
				console.log(result);
				if (result.status == 'ok') {
					this.profile.setUserInfo(result.cookie, result.user)
					this.goToPageBasedOnUserStatus(result.user.logged_in_status)
				} else {
					this.errorMsg = result.error;
				}

			},(error: any) => {
				console.log(error);
			});
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
		this.navController.push(ResetPasswordPage);
	}
}
