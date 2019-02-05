import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage({ name: "pictureView", segment: "pictureView" })
@Component({
  selector: 'dashboard',
  templateUrl: 'index.html'
})

export class PictureView {

  constructor(public navCtrl: NavController) {

  }

}
