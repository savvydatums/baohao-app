import { ResetPasswordPage } from './../registration/reset-password/reset-password';
import { PaymentPage } from '../activate/payment/payment';
import { ProcessingPage } from '../activate/processing/processing';
import { DashboardPage } from '../dashboard/index/index';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

	public credentialsForm: FormGroup;
	public loginError: boolean = false;

	constructor(public navController: NavController,
				public navParams: NavParams,
				private formBuilder: FormBuilder,
				public translate: TranslateService) {

		this.credentialsForm = this.formBuilder.group({
			registrationID: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ionViewDidLoad() {
		setTimeout(() => this.navController.push(DashboardPage), 1000); // this is only for testing
	}

  	onSignIn() {
		if (this.credentialsForm.invalid) {
			this.loginError = true;
			return;
		}

		const regID = this.credentialsForm.controls['registrationID'].value;
		const password = this.credentialsForm.controls['password'].value;

		if (regID == 101 && password == 101) {
			this.navController.push(ProcessingPage);
		} else if (regID == 102 && password == 102) {
			this.navController.push(DashboardPage);
		} else {
			this.navController.push(PaymentPage);
		}
  	}

	onForgotPassword() {
		this.navController.push(ResetPasswordPage);
	}
}
