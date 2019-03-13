import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-insight-summary',
  templateUrl: 'insight-summary.html',
})
export class InsightSummaryPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private view: ViewController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad InsightSummaryPage');
	}

	closeModal() {
		this.view.dismiss()
	}

}
