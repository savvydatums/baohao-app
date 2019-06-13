import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { InsightResponseStatus } from '../../../api/Comms';
import { ProfileModel } from '../../../model/ProfileModel';
import { ArchiveModel } from '../../../model/ArchiveModel';
import { TranslateService } from '@ngx-translate/core';
import {shortenContent, renderTimeStamp, getKeywordInfo, getKeywordText, unStarItem, trashItem} from '../../../utils/insight-util';
import { HeaderComponent } from '../../../components/header/header';
import { SearchBarComponent } from '../../../components/search-bar/search-bar';
import { InsightAPI } from '../../../api/InsightAPI';
import { insightFilterTypes, insightSearchFilters, insightType } from '../insights/settings/settings';
import { showError } from '../../../utils/alert-generic';

@IonicPage({ name: "archive", segment: "archive" })
@Component({
	selector: 'insight-list',
	templateUrl: 'index.html'
})

export class ArchivePage {

	type: string = insightType.all;
	loading = true;
	shortenContent: Function = shortenContent;
	renderTimeStamp: Function = renderTimeStamp;
	getKeywordText: Function = getKeywordText;
	searchFilters: string[] = insightSearchFilters;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

	constructor(
		public navCtrl: NavController,
		public archive: ArchiveModel,
		public modalCtrl: ModalController,
		private alertCtrl: AlertController,
		public translate: TranslateService,
		public profile: ProfileModel) {
	}

	ngAfterViewInit() {
		this.getArchiveInsights()
		this.showLoading(true)
	}

	private getArchiveInsights() {
		let self = this
		InsightAPI.getAllClientInsight(this.profile.cookie, insightFilterTypes.archive)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.archive.addData(result.results)
					self.showLoading(false)
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
	}

	public showInsightInfo(info) {
		let insightModal = this.modalCtrl.create(
			'InsightDetailsPage', { info, type: insightType.all }
		);

		insightModal.present();
	}

	public getKeywordColor(category) {
		return getKeywordInfo(this.type, category).color
	}

	private showLoading (show) {
		this.loading = show
	}

	public searchHandler (keyword, filter) {
		this.archive.applyFilter(keyword, filter);
	}

	public unStarInsight(record_id, source) {
		return unStarItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source);
	}

	public trashInsight(record_id, source, categories) {
		return trashItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source, null, categories);
	}

}
