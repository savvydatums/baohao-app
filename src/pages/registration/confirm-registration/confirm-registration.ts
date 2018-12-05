import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './confirm-registration.html'
})

export class ConfirmRegistrationPage {

  constructor(public navController: NavController) {
  }

  public onResend () {
    // get element from model and resend email request
  }
}