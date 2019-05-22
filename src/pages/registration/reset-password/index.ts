import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { UserAPI } from '../../../api/UserAPI';
import { sendGenericUpdateAlert } from '../../../utils/alert-generic';
import { PasswordValidation } from '../../../utils/Validators';

@IonicPage({ name: "ResetPasswordPage", segment: "ResetPasswordPage"})
@Component({
	selector: 'reset-pass', // need to change htis
	templateUrl: './index.html'
})
// change password page
export class ResetPasswordPage {

	changeForm: FormGroup;
	cookie:string;

	constructor(
		private view: ViewController,
		public navController: NavController,
		public translate: TranslateService,
		public navCtrl: NavController,
		private alertCtrl: AlertController,
		public navParams: NavParams,
		private formBuilder: FormBuilder) {

		this.cookie = this.navParams.get('cookie');

		this.changeForm = this.formBuilder.group({
			password: ['',
				Validators.compose([
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(20)
				])
			],
			confirmPassword: ['', Validators.required]
		}, {
			validator: PasswordValidation.matchPassword
		});
	}

	public onReset () {
		const password = this.changeForm.controls['password'].value
		this.submitNewPassword(password)
	}

	public gotoLogin () {
		//this.navCtrl.push(LoginPage);
	}

	public submitNewPassword(newPass) {
		const payload = {
			cookie: this.cookie,
			password: newPass
		}

		UserAPI.sendResetPassword(payload)
			.then((result: any) => {
				const isFail = result.status !== 'ok'
				sendGenericUpdateAlert(this.alertCtrl, this.translate, isFail)
				this.closeModal()
			},
			(error: any) => {
				sendGenericUpdateAlert(this.alertCtrl, this.translate, true, error)
				this.closeModal()
			});
	}

	closeModal() {
		this.view.dismiss()
	}
}