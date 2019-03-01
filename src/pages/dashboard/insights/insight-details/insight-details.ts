import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InsightDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insight-details',
  templateUrl: 'insight-details.html',
})
export class InsightDetailsPage {

	public insightData: object;

	constructor(
		public navCtrl: NavController,
		private view:ViewController,
		public navParams: NavParams) {
	}

	ionViewWillLoad() {
		const profile = this.navParams.get('profile');
		this.insightData = profile;
		console.log('ionViewDidLoad InsightDetailsPage', this.insightData);
	}

	public renderTimeStamp(timestamp: number) {
		const time = parseInt(timestamp + '000')
		return new Date(time).toDateString()
	}

	closeModal () {
		this.view.dismiss()
	}

}
