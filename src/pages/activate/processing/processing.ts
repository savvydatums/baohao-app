import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentModel } from '../../../model/AppointmentModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

const locations = ['location-1', 'location-2', 'location-3'];
const times = ['9:30 - 10:00', '10:00 – 10:30', '10:30 – 11:00'];

@IonicPage()
@Component({
  selector: 'activate',
  templateUrl: './processing.html'
})

export class ProcessingPage {

  appointmentForm: FormGroup;
  locations: string[];
  times: string[];
  address: string;
  editable: boolean;
  submitted: boolean;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public appointmentModel : AppointmentModel,
    public translate: TranslateService,
    private formBuilder: FormBuilder)
  {

    this.appointmentForm = this.formBuilder.group({
      time: ['10:00 – 10:30', Validators.required],
      location: ['location-3', Validators.required]
    });

    this.locations = locations;
    this.times = times;
    this.address = '242 New taipei city, Taiawn'; // here all coming from backend
    this.editable = true;
    this.submitted = false;
  }

  public onChange () {
    // should add user id and such
    this.appointmentModel.time = this.appointmentForm.controls['time'].value
    this.appointmentModel.location = this.appointmentForm.controls['location'].value

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
    this.submitted = true;
    this.editable = true;
  }

  public onEdit () {
    this.editable = false;
  }
}