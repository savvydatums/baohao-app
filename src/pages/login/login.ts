import { ResetPasswordPage } from './../registration/reset-password/reset-password';
import { PaymentPage } from '../activate/payment/payment';
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

  	onSignIn() {
		if (this.credentialsForm.invalid) {
			this.loginError = true;
			return;
		}

		console.log('registrationID: ', this.credentialsForm.controls['registrationID'].value);
		console.log('password: ', this.credentialsForm.controls['password'].value);

		const regID = this.credentialsForm.controls['registrationID'].value;
		const password = this.credentialsForm.controls['password'].value;

		if (regID == 101 && password == 101) {
			// Define different routes based on user deets here
		} else {
			this.navController.push(PaymentPage);
		}
  	}

	onForgotPassword() {
		this.navController.push(ResetPasswordPage);
	}
}
