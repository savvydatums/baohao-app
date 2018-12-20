import { TRegistered } from '../../../model/types';
import { LoggedInUserModel } from '../../../model/LoggedInUserModel';
//import { RegistrationAPI } from '../../../api/RegistrationAPI';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { registrationMockResponse } from '../../../api/registration-mock-data';
import { ConfirmComponent } from '../../../components/confirm/confirm.component';

@IonicPage()
@Component({
    selector: 'registration',
    templateUrl: './individual-reservation.html'
})

export class IndividualReservationPage {

	registrationForm: FormGroup;

	constructor(
		public navController: NavController,
		public modalCtrl: ModalController,
		public registrationModel: RegistrationModel,
		public loggedInUserModel: LoggedInUserModel,
		private formBuilder: FormBuilder) {

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

	public onRegister () {

		this.registrationModel.lastname = this.registrationForm.controls['lastname'].value;
		this.registrationModel.firstname = this.registrationForm.controls['firstname'].value;
		this.registrationModel.email = this.registrationForm.controls['email'].value;
		this.registrationModel.mobile = this.registrationForm.controls['mobile'].value;
		this.registrationModel.companyName = this.registrationForm.controls['companyName'].value;
		this.registrationModel.jobTitle = this.registrationForm.controls['jobTitle'].value;
		this.registrationModel.dob = this.registrationForm.controls['dob'].value;
		this.registrationModel.gender = this.registrationForm.controls['gender'].value;

		/*
		* API call for posting registration
		RegistrationAPI.setNewUser(this.registrationModel)
		.then((success)=> {
			console.log(success);
		},
		(error:any)=> {
		console.log(error);
		});
		*/

		// For now just use mock data
		const response:TRegistered = registrationMockResponse;
		this.loggedInUserModel.userId = response.result.userId;
		this.confirmed();
	}

	private confirmed() {
		this.navController.push(
		ConfirmComponent, {
			titleText: true,
			bodyText: false,
			emailText: true,
			resendCallback: this.callback.bind(this)
		})
	}

	public callback() {
		// here has email payload and url
		console.log('from callback in individual-registration', this.registrationModel)
	}
}