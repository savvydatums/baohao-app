import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FaqPage } from '../faq';

@IonicPage({ name: "SupportPage", segment: "SupportPage" })
@Component({
	selector: 'support',
	templateUrl: 'index.html',
})
export class SupportPage {

	constructor(
		public navCtrl: NavController,
		public translate: TranslateService,
		public navParams: NavParams) {
	}
	
	public goToFAQ () {
		this.navCtrl.push(FaqPage);
	}
}