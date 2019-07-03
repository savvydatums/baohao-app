import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ConfirmComponent } from '../../../components/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { fetchCompaniesFromLocale } from '../../../utils/Data-Fetch'
import { RegistrationAPI } from '../../../api/RegistrationAPI';
import { ResponseStatus } from '../../../api/Comms';
import { TRegisteredResponse } from '../../../model/types';

@IonicPage()
@Component({
	selector: 'registration',
	templateUrl: './individual-reservation.html'
})

export class IndividualReservationPage {

	registrationForm: FormGroup;
	companies: Object;

	constructor(
		public navController: NavController,
		public registration: RegistrationModel,
		public translate: TranslateService,
		private formBuilder: FormBuilder,
		private alertCtrl: AlertController) {

		this.registrationForm = this.formBuilder.group({
			lastname: ['', Validators.required],
			firstname: ['', Validators.required],
			email: ['', Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])],
			mobile: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(15),
				Validators.minLength(7),
			])],
			companyName: ['', Validators.required],
			jobTitle: [''],
			dob: ['', Validators.required],
			gender: ['', Validators.required]
		});
	}

	ngAfterViewInit() {
		const store = this.translate.store
		this.companies = fetchCompaniesFromLocale (store.currentLang, store.defaultLang, store.translations)
	}

	public onRegister () {

		this.registration.lastname = this.registrationForm.controls['lastname'].value;
		this.registration.firstname = this.registrationForm.controls['firstname'].value;
		this.registration.email = this.registrationForm.controls['email'].value;
		this.registration.mobile = this.registrationForm.controls['mobile'].value;
		this.registration.companyName = this.registrationForm.controls['companyName'].value;
		this.registration.jobTitle = this.registrationForm.controls['jobTitle'].value;
		this.registration.dob = this.registrationForm.controls['dob'].value;
		this.registration.gender = this.registrationForm.controls['gender'].value;

		// reassign
		this.registration.username = this.registration.registration_id

		RegistrationAPI.createNewUser(this.registration)
			.then((result: TRegisteredResponse)=> {
				if (result.code == ResponseStatus.SUCCESS) {
					this.confirmed();
				} else {
					this.showError(result.message);
				}
			},(error:any) => {
				this.showError(error.message);
			});
	}

	private confirmed() {
		this.navController.push(
			ConfirmComponent, {
				titleText: true,
				bodyText: false,
				emailText: true
			})
	}

	private showError (message) {
		const alert = this.alertCtrl.create({
			title: this.translate.translations.CREATE_FAILED,
			message: message,
			buttons: [{
				text: this.translate.translations.GLOBAL_CANCEL_BUTTON_LABEL
			}]
		})

		alert.present()
	}
}