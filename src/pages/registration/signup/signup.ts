import { IndividualReservationPage } from './../individual-reservation/individual-reservation';
import { PasswordValidation } from '../../../utils/Validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from './../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './signup.html'
})

export class SignupPage {

  registrationForm: FormGroup;

  constructor(
              public navController: NavController, 
              public modalCtrl: ModalController, 
              public registrationModel: RegistrationModel, 
              public translate: TranslateService,
              private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      registrationId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.required]
    }, {
      validator: PasswordValidation.matchPassword
    });
  }


  public onRegister () {
    this.registrationModel.registrationId = this.registrationForm.controls['registrationId'].value
    this.registrationModel.password = this.registrationForm.controls['password'].value
    this.navController.push(IndividualReservationPage);
  }

  public openModal(){ 
    var termsModal = this.modalCtrl.create('TermsModalPage'); 
    termsModal.present();
  }
}