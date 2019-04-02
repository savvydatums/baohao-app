import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AllClient } from '../../pages/dashboard/insights/allclient'
import { InsightsModel } from '../../model/InsightsModel';

export const THEME = {
	LIST: 'theme_list'
}

@Component({
	selector: 'header',
	templateUrl: 'header.html'
})

export class HeaderComponent {

	isPicture: boolean;
	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public insights: InsightsModel
	) {}

	// not done
	public setTheme (theme:string) {

		if (theme === THEME.LIST) {
			this.isPicture = false;
		}
	}

	// not done
	public renderTheme (theme:string) {
		// TODO: add page transition when push https://ionicframework.com/docs/native/native-page-transitions/

		this.isPicture = theme === 'picture';
		if (this.isPicture) {
			//this.navCtrl.push();
		} else {
			this.navCtrl.push(AllClient, { currentSelect: 0 });
		}
	}

	public getSummaryPopup () {
		let insightModal = this.modalCtrl.create(
			'InsightSummaryPage', { data: this.insights.summary }
		);

		insightModal.present();
	}

}