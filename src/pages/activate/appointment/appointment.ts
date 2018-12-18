import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentModel } from '../../../model/AppointmentModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from '../../../components/confirm/confirm.component'

const locations = ['location-1', 'location-2', 'location-3'];
const times = ['9:30 - 10:00', '10:00 – 10:30', '10:30 – 11:00'];

@IonicPage()
@Component({
  selector: 'activate',
  templateUrl: './appointment.html'
})

export class Appointment {

  appointmentForm: FormGroup;
  locations: Array;
  times: Array;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public appointmentModel : AppointmentModel,
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

  public onActivate () {
    // should add user id and such
    this.appointmentModel.time = this.appointmentForm.controls['time'].value
    this.appointmentModel.location = this.appointmentForm.controls['location'].value
    this.appointmentModel.mobile = this.appointmentForm.controls['mobile'].value
    console.log('from appointment ', this.appointmentModel);

    // TODO: fake response for it to go to confirm page
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
    const ticket_number = 'Individual:12345'
    this.confirmed(ticket_number);
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