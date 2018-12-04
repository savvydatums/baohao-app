import { PasswordValidation } from '../../../utils/Validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from '../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './user-details.html'
})

export class UserDetailsPage {

  registrationForm: FormGroup;

  constructor(public navController: NavController, public modalCtrl: ModalController, public registrationModel: RegistrationModel, private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      registrationId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.required]
    }, {
      validator: PasswordValidation.matchPassword // your validation method
    });
  }
}