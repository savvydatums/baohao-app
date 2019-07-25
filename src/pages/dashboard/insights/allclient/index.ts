import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { AllInsightsModel } from '../../../../model/AllInsightsModel';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar'
import { insightType } from '../settings/settings';
import { ProfileModel } from '../../../../model/ProfileModel';
import { renderTimeStamp, starItem, trashItem, getKeywordInfo, getKeywordText, assignClientInsightToModal} from '../../../../utils/insight-util';

@IonicPage({ name: "AllClient", segment: "AllClient" })
@Component({
	selector: 'insight-list',
	templateUrl: 'index.html'
})

export class AllClient {

	type: string = insightType.all;
	searchValue: string;
	categoryColors: object;
	renderTimeStamp: Function = renderTimeStamp;
	getKeywordText: Function = getKeywordText;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

	constructor(
		public navCtrl: NavController,
		public insights: AllInsightsModel,
		private toastCtrl: ToastController,
		public profile: ProfileModel,
		public translate: TranslateService,
		public modalCtrl: ModalController,
	) {}

	ionViewWillEnter() {
		//this.filterText = this.translate.instant('NAVIGATION.FILTER')
	}

	public getKeywordColor(category) {
		const color = getKeywordInfo(this.type, category).color
		return color
	}

	public showInsightInfo(info) {
		let insightModal = this.modalCtrl.create(
			'InsightDetailsPage', { info, type: insightType.all }
		);

		insightModal.present();
	}

	public searchHandler(keyword) {
		this.insights.applyFilter2(keyword);
	}

	public starInsight(record_id, source, categories) {
		const callback = () => { assignClientInsightToModal(this.profile.cookie, this.insights)}
		return starItem(this.profile.cookie, this.toastCtrl, this.translate, record_id, source, null, categories, callback.bind(this));
	}

	public trashInsight(record_id, source, categories) {
		const callback = () => { assignClientInsightToModal(this.profile.cookie, this.insights) }
		return trashItem(this.profile.cookie, this.toastCtrl, this.translate, record_id, source, null, categories, callback.bind(this));
	}

	public fetchTranslation(key) {
		if (key) {
			return this.translate.instant(key);
		}
	}
}
