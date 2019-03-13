import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ListView } from '../../pages/dashboard/insights/listView'
import { PictureView } from '../../pages/dashboard/insights/pictureView'
import { InsightsModel } from '../../model/InsightsModel';

export const THEME = {
	PICTURE: 'theme_picture',
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
		if (theme === THEME.PICTURE) {
			this.isPicture = true;
		}

		if (theme === THEME.LIST) {
			this.isPicture = false;
		}
	}

	// not done
	public renderTheme (theme:string) {
		// TODO: add page transition when push https://ionicframework.com/docs/native/native-page-transitions/

		this.isPicture = theme === 'picture';
		if (this.isPicture) {
			this.navCtrl.push(PictureView);
		} else {
			this.navCtrl.push(ListView, { currentSelect: 0 });
		}
	}

	public getSummaryPopup () {
		let insightModal = this.modalCtrl.create(
			'InsightSummaryPage', { data: this.insights.summary }
		);

		insightModal.present();
	}

}