import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { AllInsightsModel } from '../../../../model/AllInsightsModel';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar'
import { keywordColors } from '../settings/settings';
import { ArchiveAPI } from '../../../../api/ArchiveAPI';
import { ProfileModel } from '../../../../model/ProfileModel';
import { InsightResponseStatus } from '../../../../api/Comms';
import { sendGenericUpdateAlert } from '../../../../utils/alert-generic';

@IonicPage({ name: "AllClient", segment: "AllClient" })
@Component({
	selector: 'AllClient',
	templateUrl: 'index.html'
})

export class AllClient {

	searchValue: string;
	categoryColors: object;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

	constructor(
		public navCtrl: NavController,
		public insights: AllInsightsModel,
		public profile: ProfileModel,
		public translate: TranslateService,
		public modalCtrl: ModalController,
		private alertCtrl: AlertController
	) {}

	ionViewWillEnter() {
		this.categoryColors = keywordColors;
	}

	public renderTimeStamp (timestamp:number) {
		const time = parseInt(timestamp + '000')
		return new Date(time).toDateString()
	}

	public shortenContent (content) {
		const lang = this.translate.currentLang || this.translate.defaultLang
		let stringNumber = lang == 'en' ? 8 : 20
		return content.substring(0, stringNumber);
	}

	public showInsightInfo(info) {
		let insightModal = this.modalCtrl.create(
			'InsightDetailsPage', { profile: info }
		);

		insightModal.present();
	}

	public archiveItem(record_id, source) {
		ArchiveAPI.archiveItem(this.profile.cookie, record_id, source)
			.then((result: any) => {
				const isFail = result.status !== InsightResponseStatus.UPDATED
				sendGenericUpdateAlert(this.alertCtrl, this.translate, isFail)
			}, error => {
				sendGenericUpdateAlert(this.alertCtrl, this.translate, true, error)
			});
	}

	public trashItem (record_id, source) {
		ArchiveAPI.trashItem(this.profile.cookie, record_id, source)
			.then((result: any) => {
				const isFail = result.status !== InsightResponseStatus.UPDATED
				sendGenericUpdateAlert(this.alertCtrl, this.translate, isFail)
			}, error => {
				sendGenericUpdateAlert(this.alertCtrl, this.translate, true, error)
			});

	}
}
