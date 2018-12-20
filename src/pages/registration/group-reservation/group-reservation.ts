import { groupRegistrationMockResponse } from './../../../api/registration-mock-data';
import { TGroupRegistered } from './../../../model/types';
import { GroupRegistrationModel } from './../../../model/GroupRegistrationModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { ConfirmComponent } from '../../../components/confirm/confirm.component'

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './group-reservation.html'
})

export class GroupReservation {

	registrationForm: FormGroup;

	constructor(
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public registrationModel: GroupRegistrationModel,
		private formBuilder: FormBuilder) {

		this.registrationForm = this.formBuilder.group({
		name: ['', Validators.required],
		email: ['', Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		])],
		mobile: ['', Validators.compose([
			Validators.required,
			Validators.maxLength(15),
			Validators.minLength(7),
		])],
		message: ['', Validators.required],
		});
	}


	public onRegister () {

		if (!this.registrationForm.valid) return;

		this.registrationModel.name = this.registrationForm.controls['name'].value
		this.registrationModel.email = this.registrationForm.controls['email'].value
		this.registrationModel.mobile = this.registrationForm.controls['mobile'].value
		this.registrationModel.message = this.registrationForm.controls['message'].value

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
		const response:TGroupRegistered = groupRegistrationMockResponse;
		this.registrationModel.ticketNumber = response.result.ticket_number;

		this.confirmed(response.result.ticket_number);
	}

	private confirmed(ticket_number) {
		this.navCtrl.push(
		ConfirmComponent, {
			ticketNumber: ticket_number,
			bodyText: true,
			emailText: true,
			resendCallback: this.callback.bind(this)
		})
	}

	public callback() {
		// here has email payload and url
		console.log('from callback in group-reservation', this.registrationModel)
	}
}