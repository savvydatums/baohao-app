import { TFormResponse } from './../../../model/types';
import { GroupRegistrationModel } from './../../../model/GroupRegistrationModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController } from 'ionic-angular';
import { ConfirmComponent } from '../../../components/confirm/confirm.component'
import { RegistrationAPI } from '../../../api/RegistrationAPI';
import { getTicketInfo, getTranslation } from '../../../utils/Data-Fetch';
import { showError } from '../../../utils/alert-generic';
import { TranslateService } from '@ngx-translate/core';

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
		public alertCtrl: AlertController,
		public translate: TranslateService,
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

        const payload = {
            [inputRef.name]: name,
            [inputRef.email]: email,
            [inputRef.mobile]: mobile,
            [inputRef.location]: location,
            [inputRef.time]: time
        }

        RegistrationAPI.sendGroupReservation(payload)
            .then((result: TFormResponse)=> {
                if (result.is_valid === true) {
					const ticket_number = getTicketInfo(result.confirmation_message)
                    this.confirmed(ticket_number);
                } else {
					showError(this.alertCtrl, this.translate, getTranslation(this.translate, 'APPOINTMENT.SUBMIT_ERROR'))
                }
            },
            (error:any)=> {
				showError(this.alertCtrl, this.translate, getTranslation(this.translate, 'APPOINTMENT.SUBMIT_ERROR'))
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
		// not really been used
		console.log('from resendEmail in group-reservation', this.registrationModel.emailId)
	}
}