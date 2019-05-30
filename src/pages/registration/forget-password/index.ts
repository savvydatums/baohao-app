import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserAPI } from '../../../api/UserAPI';
import { LoginPage } from '../../login/login';
import { TranslateService } from '@ngx-translate/core';
import { getTranslation } from '../../../utils/Data-Fetch';

@IonicPage({ name: "ForgetPassword", segment: "ForgetPassword" })
@Component({
	selector: 'registration',
  templateUrl: 'index.html',
})
export class ForgetPasswordPage {

	forgetPassForm: FormGroup;
	submitted: boolean = false;
	backendErrorMessage: string;
	submittedInfo: string;

	constructor(
		public navController: NavController,
		public translate: TranslateService,
		public navCtrl: NavController,
		private formBuilder: FormBuilder) {

		this.forgetPassForm = this.formBuilder.group({
			registrationID: ['', Validators.required],
			email: ['', Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])]
		});
	}

	public onReset() {
		if (!this.forgetPassForm.valid) return;
		const registrationID = this.forgetPassForm.controls['registrationID'].value
		const email = this.forgetPassForm.controls['email'].value

		let self = this
		UserAPI.sendForgetPassword(registrationID, email)
			.then((result:any) => {
				if (result.status == 'ok') {
					self.submitted = true;
					self.submittedInfo = result.result
					setTimeout(() => { self.gotoLogin() }, 5000);
				} else {
					self.backendErrorMessage = getTranslation(this.translate, `PASSWORD_RESET.FORGET.ERROR_ID.${result.error}`)
				}
			}, (result: any) => {
				self.backendErrorMessage = getTranslation(this.translate, `PASSWORD_RESET.FORGET.ERROR_ID.${result.error}`)
			});
	}

	public gotoLogin() {
		this.navCtrl.push(LoginPage);
	}

}
