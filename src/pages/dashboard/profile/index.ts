import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage({ name: "profile", segment: "profile"})
@Component({
  selector: 'dashboard',
  templateUrl: 'index.html'
})

export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }

}
