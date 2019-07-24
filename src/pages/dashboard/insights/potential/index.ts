import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HeaderComponent } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { renderTimeStamp, starItem, trashItem, getKeywordInfo, getKeywordText, assignPotentialToModal } from '../../../../utils/insight-util';
import { filterOptions, insightType } from '../settings/settings';
import { PotentialLeadsModel } from '../../../../model/PotentialLeadsModel';

@IonicPage({ name: 'Potential', segment: 'potential'})
@Component({
	selector: 'insight-list',
	templateUrl: 'index.html'
})
export class PotentialPage {

	type: string = insightType.potential;
	searchValue: string;
	categoryColors: object;
	searchFilters: object[] = filterOptions;
	renderTimeStamp: Function = renderTimeStamp;
	getKeywordInfo: Function = getKeywordInfo;
	getKeywordText: Function = getKeywordText;

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
		this.searchFilters.map((item:any) => {
			const lang = this.translate.currentLang || this.translate.defaultLang
			item.label = item[lang]
		})
	}

	public showPotentialLeads(info) {

		let insightModal = this.modalCtrl.create(
			'InsightDetailsPage', { info, type: insightType.potential }
		);

		insightModal.present();
	}
	public searchHandler (keyword, filter) {
		this.potential.applyFilter(keyword, filter);
	}

	public starInsight(record_id, source, group) {
		const callback = () => { assignPotentialToModal(this.profile.cookie, this.potential) }
		return starItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source, group, null, callback);
	}

	public trashInsight(record_id, source, group) {
		const callback = () => { assignPotentialToModal(this.profile.cookie, this.potential) }
		return trashItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source, group, null, callback);
	}

	public fetchTranslation(key) {
		if (key) {
			return this.translate.instant(key);
		}
	}

}
