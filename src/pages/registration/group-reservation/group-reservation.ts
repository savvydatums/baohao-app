import { GroupRegistrationModel } from './../../../model/GroupRegistrationModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './group-reservation.html'
})

export class GroupReservation {

  registrationForm: FormGroup;

  constructor(public modalCtrl: ModalController, public registrationModel: GroupRegistrationModel, private formBuilder: FormBuilder) {

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
      message: ['', Validators.required],
    });
  }


  public onRegister () {

    if (!this.registrationForm.valid) return;

    this.registrationModel.name = this.registrationForm.controls['name'].value
    this.registrationModel.email = this.registrationForm.controls['email'].value
    this.registrationModel.mobile = this.registrationForm.controls['mobile'].value
    this.registrationModel.message = this.registrationForm.controls['message'].value
  }

  public openModal(){
    var termsModal = this.modalCtrl.create('TermsModalPage');
    termsModal.present();
  }
}