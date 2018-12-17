import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentModel} from '../../../model/AppointmentModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'activate',
  templateUrl: './appointment.html'
})

export class Appointment {

  appointmentForm: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    public appointmentModel : AppointmentModel,
    private formBuilder: FormBuilder)
  {

    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      location: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }


  public onActivate () {
    // should add user id and such
    this.appointmentModel.time = this.appointmentForm.controls['time'].value
    this.appointmentModel.location = this.appointmentForm.controls['location'].value
    this.appointmentModel.mobile = this.appointmentForm.controls['mobile'].value
    console.log(this.appointmentModel);
  }
}