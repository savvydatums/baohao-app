import { LoginPage } from './../../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './reset-password.html'
})

export class ResetPasswordPage {

  resetPasswordForm: FormGroup;
  submitted:boolean = false;

  constructor(
        public navController: NavController, 
        public registrationModel: RegistrationModel, 
		public translate: TranslateService,
		public navCtrl: NavController, 
        private formBuilder: FormBuilder) {

		this.resetPasswordForm = this.formBuilder.group({
			registrationID: ['', Validators.required],
		});
	}

  	public onReset () {
		if (this.resetPasswordForm.valid) {
			this.submitted = true;
			/*
			* API call for resending email
			RegistrationAPI.setResetPassword(this.resetPasswordForm.registrationID)
			.then((success)=> {
				console.log(success);
			},
			(error:any)=> {
			console.log(error);
			});
			*/
		}
	}

	public gotoLogin () {
		this.navCtrl.push(LoginPage);
	}
}