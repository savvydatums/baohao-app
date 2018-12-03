import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registry',
  templateUrl: './group-reserved.html'
})

export class GroupReserved {

  registrationForm: FormGroup;

  constructor(public modalCtrl: ModalController, public registrationModel: RegistrationModel, private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      registrationId: ['', Validators.required],
      password: ['', Validators.required],
      passwordMatch: ['', Validators.required]
    });
  }


  public onResendEmail () {
    this.registrationModel.registrationId = this.registrationForm.controls['registrationId'].value
    this.registrationModel.password = this.registrationForm.controls['password'].value

    console.log(this.registrationModel);
  }

}