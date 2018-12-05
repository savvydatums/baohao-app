import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { ConfirmRegistrationPage } from '../confirm-registration/confirm-registration';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './user-details.html'
})

export class UserDetailsPage {

  registrationForm: FormGroup;

  constructor(public navController: NavController, public modalCtrl: ModalController, public registrationModel: RegistrationModel, private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      mobile: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(7),
      ])],
      companyName: ['', Validators.required],
      jobTitle: [''],
      dob: [''],
      gender: ['']
    });
  }

  public onRegister () {
    this.navController.push (ConfirmRegistrationPage);
  }
}