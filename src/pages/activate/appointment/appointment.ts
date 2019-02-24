import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentModel } from '../../../model/AppointmentModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from '../../../components/confirm/confirm.component'
import { ProfileModel } from '../../../model/ProfileModel';
import { RegistrationAPI } from '../../../api/RegistrationAPI';
import { TFormResponse } from '../../../model/types';
import { redirectIfNotLogin } from '../../../utils/login-util';

const locations = ['location-1', 'location-2', 'location-3'];
const times = ['9:30 - 10:00', '10:00 – 10:30', '10:30 – 11:00'];
const inputRef = {
	"location": "input_1",
	"registration_id": "input_8",
	"time": "input_10",
	"phone": "input_7"
};

@IonicPage()
@Component({
  selector: 'activate',
  templateUrl: './appointment.html'
})

export class Appointment {

  appointmentForm: FormGroup;
  locations: string[];
  times: string[];

  constructor(
	public navCtrl: NavController,
	public modalCtrl: ModalController,
	public appointmentModel : AppointmentModel,
	private profile: ProfileModel,
	public translate: TranslateService,
	private formBuilder: FormBuilder)
  {

	this.appointmentForm = this.formBuilder.group({
	  time: ['', Validators.required],
	  location: ['', Validators.required],
	  mobile: ['', Validators.required]
	});

	this.locations = locations;
	this.times = times;
  	}

	ionViewDidLoad () {
		redirectIfNotLogin(this.navCtrl, this.profile);
  	}

  public onActivate () {
	// feels no need for a model, should ask question about it
	const time = this.appointmentModel.time = this.appointmentForm.controls['time'].value
	const location = this.appointmentModel.location = this.appointmentForm.controls['location'].value
	const mobile = this.appointmentModel.mobile = this.appointmentForm.controls['mobile'].value

	// input reference
	const payload = {
		[inputRef.time]: time,
		[inputRef.location]: location,
		[inputRef.phone]: mobile,
		[inputRef.registration_id]: this.profile.registration_id
	}

	RegistrationAPI.sendIndividualAppointment(payload)
		.then((result: TFormResponse)=> {
			console.log(result);

			if (result.is_valid === true) {
				// For now just use mock data
				const ticket_number = 'Individual:12345'
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
		ticketNumber : ticket_number,
		bodyText: true,
		emailText: true,
		resendCallback: this.callback.bind(this)
	})
  }

  public callback() {
	// here has email payload and url
	console.log ('from callback in appointment', this.appointmentModel)
  }
}