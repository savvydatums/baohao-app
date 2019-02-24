import { TFormResponse } from './../../../model/types';
import { GroupRegistrationModel } from './../../../model/GroupRegistrationModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { ConfirmComponent } from '../../../components/confirm/confirm.component'
import { RegistrationAPI } from '../../../api/RegistrationAPI';

const locations = ['location-1', 'location-2', 'location-3'];
const times = ['9:30 - 10:00', '10:00 – 10:30', '10:30 – 11:00'];
const inputRef = {
    "name": "input_1",
    "email": "input_2",
    "mobile": "input_3",
    "time": "input_4",
    "location": "input_5"
};

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './group-reservation.html'
})

export class GroupReservation {

	registrationForm: FormGroup;
	locations: string[];
	times: string[];

	constructor(
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public registrationModel: GroupRegistrationModel,
		private formBuilder: FormBuilder) {

		this.locations = locations;
		this.times = times;

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
			time: ['', Validators.required],
			location: ['', Validators.required]
		});
	}


	public onRegister () {

		if (!this.registrationForm.valid) return;

		const name = this.registrationModel.name = this.registrationForm.controls['name'].value
		const email = this.registrationModel.email = this.registrationForm.controls['email'].value
		const mobile = this.registrationModel.mobile = this.registrationForm.controls['mobile'].value
		const time = this.registrationModel.time = this.registrationForm.controls['time'].value
		const location = this.registrationModel.location = this.registrationForm.controls['location'].value
		console.log('group reservation', this.registrationModel);

        // input reference
        const payload = {
            [inputRef.name]: name,
            [inputRef.email]: email,
            [inputRef.mobile]: mobile,
            [inputRef.location]: location,
            [inputRef.time]: time
        }

        RegistrationAPI.sendGroupReservation(payload)
            .then((result: TFormResponse)=> {
                console.log(result);

                if (result.is_valid === true) {
                    // For now just use mock data
                    const ticket_number = 'Group:12345'
                    this.confirmed(ticket_number);
                } else {
                    console.log ('error on submission, make appointment again ? what is the process? ')
                }
            },
            (error:any)=> {
                console.log(error);
            });
	}

	private confirmed(ticket_number) {
		this.navCtrl.push(
		ConfirmComponent, {
			ticketNumber: ticket_number,
			bodyText: true,
			emailText: true,
			resendCallback: this.resendEmail.bind(this)
		})
	}

	public resendEmail() {
		// here has email payload and url

		/*
		* API call for resending email
		RegistrationAPI.setResendEmail(this.registrationModel.emailId)
		.then((success)=> {
			console.log(success);
		},
		(error:any)=> {
		console.log(error);
		});
		*/
		console.log('from resendEmail in group-reservation', this.registrationModel.emailId)
	}
}