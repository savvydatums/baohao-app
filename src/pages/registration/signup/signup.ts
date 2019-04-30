import { IndividualReservationPage } from './../individual-reservation/individual-reservation';
import { PasswordValidation } from '../../../utils/Validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from './../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
	selector: 'registration',
	templateUrl: './signup.html'
})

export class SignupPage {

	registrationForm: FormGroup;

	constructor(
		public navController: NavController,
		public modalCtrl: ModalController,
		public registrationModel: RegistrationModel,
		public translate: TranslateService,
		private formBuilder: FormBuilder) {

		this.registrationForm = this.formBuilder.group({
			registration_id: ['',
				Validators.compose([
					Validators.required,
				Validators.pattern(`^(PIBA|CIB|HKFI).*`)
				])],
			password: ['',
				Validators.compose([
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(20)
				])
			],
			confirmPassword: ['', Validators.required],
			acceptTerms: [false, Validators.requiredTrue]
		}, {
			validator: PasswordValidation.matchPassword
		});
	}


	public onRegister () {
		this.registrationModel.registration_id = this.registrationForm.controls.registration_id.value
		this.registrationModel.password = this.registrationForm.controls.password.value
		this.navController.push(IndividualReservationPage);
	}

	public openTerms(){
		const lang = this.translate.currentLang || this.translate.defaultLang
		const termsModal = this.modalCtrl.create('TermsModalPage', { lang });
		termsModal.present();
	}
}