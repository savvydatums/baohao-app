import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { HeaderComponent } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { renderTimeStamp, starItem, trashItem, getKeywordInfo, getKeywordText, assignPotentialToModal, assignClientInsightToModal } from '../../../../utils/insight-util';
import { filterOptions, insightType, insightFilterTypes } from '../settings/settings';
import { PotentialLeadsModel } from '../../../../model/PotentialLeadsModel';
import { ArchiveModel } from '../../../../model/ArchiveModel';
import { TrashModel } from '../../../../model/TrashModel';

@IonicPage({ name: 'Potential', segment: 'potential'})
@Component({
	selector: 'insight-list',
	templateUrl: 'index.html'
})
export class PotentialPage {

	type: string = insightType.potential;
	search: object;
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
		public archive: ArchiveModel,
		public trash: TrashModel,
		private toastCtrl: ToastController,
		public translate: TranslateService,
		public potential: PotentialLeadsModel,
		public modalCtrl: ModalController) {
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
		this.search = { keyword, searchtype: filter ? filter : 'both' }
		assignPotentialToModal(this.profile.cookie, this.potential, 1, this.search)
	}

	public starInsight(record_id, source, group) {
		const callback = () => { 
			assignPotentialToModal(this.profile.cookie, this.potential, 1) 
			assignClientInsightToModal(this.profile.cookie, this.archive, 1, null, null, null, insightFilterTypes.archive) 
		}
		return starItem(this.profile.cookie, this.toastCtrl, this.translate, record_id, source, group, null, callback);
	}

	public trashInsight(record_id, source, group) {
		const callback = () => { 
			assignPotentialToModal(this.profile.cookie, this.potential, 1) 
			assignClientInsightToModal(this.profile.cookie, this.trash, 1, null, null, null, insightFilterTypes.trash)
		}
		return trashItem(this.profile.cookie, this.toastCtrl, this.translate, record_id, source, group, null, callback);
	}

	public fetchTranslation(key) {
		if (key) {
			return this.translate.instant(key);
		}
	}

	public loadMoreData(event) {
		const successCallBack = () => { event.complete(); }
		const errorCallBack = (error) => { console.log(error); }
		const page = this.potential.loadedPage + 1

		assignPotentialToModal(this.profile.cookie, this.potential, page, this.search, successCallBack, errorCallBack)
	}

}
