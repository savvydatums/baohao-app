import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserAPI } from '../../../api/UserAPI';
import { LoginPage } from '../../login/login';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({ name: "ForgetPassword", segment: "ForgetPassword" })
@Component({
	selector: 'registration',
  templateUrl: 'index.html',
})
export class ForgetPasswordPage {

	resetPasswordForm: FormGroup;
	submitted: boolean = false;

	constructor(
		public navController: NavController,
		public translate: TranslateService,
		public navCtrl: NavController,
		private formBuilder: FormBuilder) {

		this.resetPasswordForm = this.formBuilder.group({
			registrationID: ['', Validators.required]
		});
	}

	public onReset() {
		if (!this.resetPasswordForm.valid) return;
		const registrationID = this.resetPasswordForm.controls['registrationID'].value

		let self = this
		UserAPI.sendForgetPassword(registrationID)
			.then((success) => {
				self.submitted = true;
				setTimeout(() => {
					self.gotoLogin()
				}, 5000);
			}, (error: any) => {
				console.log('submit failed')
			});
	}

	public gotoLogin() {
		this.navCtrl.push(LoginPage);
	}

}
