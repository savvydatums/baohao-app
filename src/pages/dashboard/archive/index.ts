import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({ name: "archive", segment: "archive" })
@Component({
  selector: 'dashboard',
  templateUrl: 'index.html'
})

export class ArchivePage {

  constructor(public navCtrl: NavController) {

  }

}
