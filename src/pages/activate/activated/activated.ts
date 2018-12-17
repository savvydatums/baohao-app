import { AppointmentModel } from '../../../model/AppointmentModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './activated.html'
})

export class ActivatedPage {

  constructor(
    public modalCtrl: ModalController,
    public appointmentModel: AppointmentModel) {
  }

  public onResendEmail () {
    console.log(this.appointmentModel);
  }

}