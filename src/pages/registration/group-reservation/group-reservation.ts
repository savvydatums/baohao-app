import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from './../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registry',
  templateUrl: './group-reservation.html'
})

export class GroupReservation {

  registrationForm: FormGroup;

  constructor(public modalCtrl: ModalController, public registrationModel: RegistrationModel, private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      registrationId: ['', Validators.required],
      password: ['', Validators.required],
      passwordMatch: ['', Validators.required]
    });
  }


  public onRegister () {
    this.registrationModel.registrationId = this.registrationForm.controls['registrationId'].value
    this.registrationModel.password = this.registrationForm.controls['password'].value

    console.log(this.registrationModel);
  }

  public openModal(){
    var termsModal = this.modalCtrl.create('TermsModalPage');
    termsModal.present();
  }
}