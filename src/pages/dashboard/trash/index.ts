import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { InsightResponseStatus } from '../../../api/Comms';
import { showError, sendGenericUpdateAlert, sendGenericToastMessage } from '../../../utils/alert-generic';
import { TranslateService } from '@ngx-translate/core';
import { ArchiveAPI } from '../../../api/ArchiveAPI';
import { TrashModel } from '../../../model/TrashModel';
import { renderTimeStamp, getKeywordText, getKeywordInfo } from '../../../utils/insight-util';
import { insightFilterTypes, insightType } from '../insights/settings/settings';
import { InsightAPI } from '../../../api/InsightAPI';

@IonicPage({ name: "trash", segment: "trash" })
@Component({
	selector: 'insight-list',
	templateUrl: 'index.html'
})
export class TrashPage {

	type: string = insightType.all;
	loading = true;
	renderTimeStamp: Function = renderTimeStamp;
	getKeywordText: Function = getKeywordText;

	constructor(
		public navCtrl: NavController,
		public profile: ProfileModel,
		public trash: TrashModel,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		public translate: TranslateService,
		public modalCtrl: ModalController,
		public navParams: NavParams) {
	}

	ionViewDidLoad() {
		this.getTrashedInsights();
	}

	private getTrashedInsights() {
		let self = this
		InsightAPI.getAllClientInsight(this.profile.cookie, insightFilterTypes.trash)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.trash.list = result.results
					self.showLoading(false)
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
	}

	private showLoading(show) {
		this.loading = show;
	}

	public showInsightInfo(info) {
		let insightModal = this.modalCtrl.create(
			'InsightDetailsPage', { info, type: insightType.all }
		);

		insightModal.present();
	}

	public unTrashItem(record_id, source) {
		let self = this
		ArchiveAPI.unTrashItem(this.profile.cookie, record_id, source)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.getTrashedInsights()
					sendGenericToastMessage(this.toastCtrl, this.translate, 'INSIGHT.TRASH.UNTRASH_MESSAGE', null)
				} else {
					sendGenericToastMessage(this.toastCtrl, this.translate, null, false)
				}
			}, error => {
				sendGenericToastMessage(this.toastCtrl, this.translate, null, false)
			});
	}

	public deletePermentaly(record_id, source) {
		let self = this
		ArchiveAPI.deleteTrashItem(this.profile.cookie, record_id, source)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.getTrashedInsights()
					sendGenericToastMessage(this.toastCtrl, this.translate, 'INSIGHT.TRASH.DELETE_MESSSAGE', null)
				} else {
					sendGenericUpdateAlert(this.alertCtrl, this.translate, true)
				}
			}, error => {
				sendGenericUpdateAlert(this.alertCtrl, this.translate, true)
			});
	}

	public getKeywordColor(category) {
		return getKeywordInfo(this.type, category).color
	}

}
