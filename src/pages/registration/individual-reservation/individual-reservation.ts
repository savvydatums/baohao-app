import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController } from 'ionic-angular';
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
		public modalCtrl: ModalController,
		public registrationModel: RegistrationModel,
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
		this.companies = fetchCompaniesFromLocale (store.currentLang, store.defaultLang, store.translations )
	}

	public onRegister () {

		this.registrationModel.lastname = this.registrationForm.controls['lastname'].value;
		this.registrationModel.firstname = this.registrationForm.controls['firstname'].value;
		this.registrationModel.email = this.registrationForm.controls['email'].value;
		this.registrationModel.mobile = this.registrationForm.controls['mobile'].value;
		this.registrationModel.companyName = this.registrationForm.controls['companyName'].value;
		this.registrationModel.jobTitle = this.registrationForm.controls['jobTitle'].value;
		this.registrationModel.dob = this.registrationForm.controls['dob'].value;
		this.registrationModel.gender = this.registrationForm.controls['gender'].value;

		// reassign
		this.registrationModel.username = this.registrationModel.registration_id

		// registrationID and password
		console.log(this.registrationModel)

		RegistrationAPI.createNewUser(this.registrationModel)
			.then((result: TRegisteredResponse)=> {
				if (result.code == ResponseStatus.SUCCESS) {
					this.confirmed();
				} else {
					this.showError(result.message);
				}
			},(error:any) => {
				this.showError(error);
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
				text: this.translate.translations.GLOBA_CANCEL_BUTTON_LABEL
			}]
		})

		alert.present()
	}
}