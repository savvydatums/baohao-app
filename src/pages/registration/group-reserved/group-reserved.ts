import { GroupRegistrationModel } from './../../../model/GroupRegistrationModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './group-reserved.html'
})

export class GroupReserved {

  registrationForm: FormGroup;
  ticketNumber:string=""

  constructor(public modalCtrl: ModalController, public registrationModel: GroupRegistrationModel, private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      registrationId: ['', Validators.required],
      password: ['', Validators.required],
      passwordMatch: ['', Validators.required]
    });

    this.ticketNumber = this.registrationModel.ticketNumber;

  }


  public onResendEmail () {
  
  }

}