import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }

  public signin () {
    //this.navCtrl.push(); // change to sign in
  }

  public forgetPass() {
    //this.navCtrl.push(HomePage);
  }

}
