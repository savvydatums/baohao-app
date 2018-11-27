import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController) {
  }

  public gotoLogin () {
    this.navCtrl.push(LoginPage);
  }
}
