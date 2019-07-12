import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

type TQuesitonPair = {
	Q: string;
	A: string;
};

@IonicPage({ name: "FaqPage", segment: "FaqPage" })
@Component({
  selector: 'faq',
  templateUrl: 'index.html',
})

export class FaqPage {

	questions: TQuesitonPair[];

	constructor(
		public navCtrl: NavController,
		public translate: TranslateService, 
		public navParams: NavParams) {
	}

	ionViewWillEnter() {
		this.questions =  this.translate.instant('FAQ')
	}

}
