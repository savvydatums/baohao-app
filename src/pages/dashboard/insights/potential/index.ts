import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HeaderComponent } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { renderTimeStamp, shortenContent, starItem, trashItem } from '../../../../utils/insight-util';
import { keywordColors, insightFilters } from '../settings/settings';
import { PotentialLeadsModel } from '../../../../model/PotentialLeadsModel';

@IonicPage({ name: 'Potential', segment: 'potential'})
@Component({
	selector: 'insight-list',
	templateUrl: 'index.html'
})
export class PotentialPage {

	searchValue: string;
	categoryColors: object;
	searchFilters: string[] = insightFilters;
	renderTimeStamp: Function = renderTimeStamp;
	shortenContent: Function = shortenContent;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public profile: ProfileModel,
		public translate: TranslateService,
		public potential: PotentialLeadsModel,
		public modalCtrl: ModalController,
		private alertCtrl: AlertController) {
	}

	ionViewWillEnter() {
		this.categoryColors = keywordColors;
	}

	public showPotentialLeads(info) {
		let insightModal = this.modalCtrl.create(
			'InsightDetailsPage', { profile: info }
		);

		insightModal.present();
	}
	public searchHandler (keyword, filter) {
		this.potential.applyFilter(keyword, filter);
	}

	public starInsight(record_id, source, categories) {
		return starItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source, null, categories);
	}

	public trashInsight(record_id, source, categories) {
		return trashItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source, null, categories);
	}

}
