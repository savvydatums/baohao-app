import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({ name: "FaqPage", segment: "FaqPage" })
@Component({
  selector: 'faq',
  templateUrl: 'index.html',
})
export class FaqPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FaqPage');
	}

}
