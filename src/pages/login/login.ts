import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder) {

    this.credentialsForm = this.formBuilder.group({
      registrationID: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignIn() {
    console.log('registrationID: ', this.credentialsForm.controls['registrationID'].value);
    console.log('password: ', this.credentialsForm.controls['password'].value);
  }

  onForgotPassword() {
    
  }
}
