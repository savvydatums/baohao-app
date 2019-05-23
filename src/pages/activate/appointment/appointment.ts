import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentModel } from '../../../model/AppointmentModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from '../../../components/confirm/confirm.component'
import { RegistrationAPI } from '../../../api/RegistrationAPI';
import { TFormResponse } from '../../../model/types';
//import { redirectIfNotLogin } from '../../../utils/login-util';
import { getTicketInfo, getTranslation } from '../../../utils/Data-Fetch';
import { showError } from '../../../utils/alert-generic';
import { UserAPI } from '../../../api/UserAPI';

const locations = ['location-1', 'location-2', 'location-3'];
const times = ['9:30 - 10:00', '10:00 – 10:30', '10:30 – 11:00'];
const inputRef = {
	"location": "input_1",
	"date": "input_2",
	"phone": "input_7",
	"registration_id": "input_8",
	"time": "input_10",
	"name": "input_11",
	"email": "input_12"
};

@IonicPage({
	segment: 'appointment/:cookie'
})
@Component({
	selector: 'activate',
	templateUrl: './appointment.html'
})

export class Appointment {

	appointmentForm: FormGroup;
	locations: string[];
	times: string[];

	registrationId: string;
	cookie: string;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public appointment : AppointmentModel,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public translate: TranslateService,
		private formBuilder: FormBuilder)
	{

		this.appointmentForm = this.formBuilder.group({
			time: ['', Validators.required],
			location: ['', Validators.required],
			mobile: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(15),
				Validators.minLength(7),
			])],
		});

		this.locations = locations;
		this.times = times;
		this.cookie = this.navParams.get('cookie')

		if (this.cookie.length > 0) {
			this.getUserInfo()
		} else {
			showError(this.alertCtrl, this.translate, getTranslation(this.translate, 'PROFILE.COOKIE_ERROR'))
		}
	}

	public getUserInfo () {
		UserAPI.getUserInfo(this.cookie)
			.then((result: any) => {
				console.log(result);
				if (result.status === 'ok') {
					this.registrationId = result.user.registration_id
				} else {
					showError(this.alertCtrl, this.translate, getTranslation(this.translate, 'PROFILE.ERROR_RESPONSE'))
				}
			},
			(error: any) => {
				showError(this.alertCtrl, this.translate, getTranslation(this.translate, 'PROFILE.ERROR_RESPONSE'))
			});
	}

  	public onActivate () {
		this.appointment.time = this.appointmentForm.controls['time'].value
		this.appointment.location = this.appointmentForm.controls['location'].value
		this.appointment.mobile = this.appointmentForm.controls['mobile'].value

		this.submitForm()
	}

	private submitForm () {
		console.log ('from callback in appointment', this.appointment)

		// input reference
		const payload = {
			[inputRef.time]: this.appointment.time,
			[inputRef.location] : this.appointment.location,
			[inputRef.phone] : this.appointment.mobile,
			[inputRef.registration_id]: this.registrationId,
			// [inputRef.date]: '2018/03/23', [inputRef.name]: 'aaaa', [inputRef.email]:
			// 'sss@gmail.com' [inputRef.name]: `${this.profile.lastname}
			// ${this.profile.firstname}`, [inputRef.email]: this.profile.email
		}

		RegistrationAPI.sendIndividualAppointment(payload)
			.then((result: TFormResponse) => {
				if (result.is_valid === true) {
					const ticket_number = getTicketInfo(result.confirmation_message)
					console.log(ticket_number)
					this.confirmed(ticket_number);
				} else {
					showError(this.alertCtrl, this.translate, getTranslation(this.translate, 'APPOINTMENT.SUBMIT_ERROR'))
				}
			},
			(error: any) => {
				showError(this.alertCtrl, this.translate, getTranslation(this.translate, 'APPOINTMENT.SUBMIT_ERROR'))
			});
	}

	private confirmed(ticket_number) {
		this.navCtrl.push(
			ConfirmComponent, {
				ticketNumber: ticket_number,
				bodyText: true,
				emailText: true,
				resendCallback: this.submitForm.bind(this)
			})
	}
}