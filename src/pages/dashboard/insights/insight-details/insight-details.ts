import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { renderTimeStampInNumber, getKeywordInfo, getKeywordText, assignPotentialToModal, assignClientInsightToModal } from '../../../../utils/insight-util';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { InsightAPI } from '../../../../api/InsightAPI';
import { insightType} from '../settings/settings';
import { TInsightPost } from '../../../../model/types';
import { InsightResponseStatus, ResponseStatus } from '../../../../api/Comms';
import { openEditNoteForNickName, sendGenericUpdateAlert, showError } from '../../../../utils/alert-generic';
import { AllInsightsModel } from '../../../../model/AllInsightsModel';
import { PotentialLeadsModel } from '../../../../model/PotentialLeadsModel';
import { getTranslation } from '../../../../utils/Data-Fetch';

@IonicPage()
@Component({
	selector: 'insight-details',
	templateUrl: 'insight-details.html',
})
export class InsightDetailsPage {

	is_existing_customer: boolean = false;
	is_remove_two_month: boolean = false;

	insightData: TInsightPost;
	type: string;
	recommendations: object[] = [];
	info: object;
	renderTimeStamp: Function = renderTimeStampInNumber;
	getKeywordInfo: Function = getKeywordInfo;
	getKeywordText: Function = getKeywordText;

	constructor(
		private view: ViewController,
		public profile: ProfileModel,
		private allClient: AllInsightsModel,
		private potential: PotentialLeadsModel,
		public translate: TranslateService,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		private modalCtrl: ModalController) {
	}

	ionViewWillLoad() {
		this.insightData = this.navParams.get('info')
		this.type = this.navParams.get('type')
		const mainCategory = this.insightData.categories[0]
		this.info = getKeywordInfo(this.type, mainCategory);
		if (this.type == insightType.potential) {
			this._getRecommendation(this.info)
		}
	}

	private _getRecommendation (catInfo) {

		// the chinese one use it's language info for category
		const lang = this.translate.currentLang || this.translate.defaultLang
		const filterCategory = lang == 'cn' ? catInfo.cn : this.insightData.categories[0]

		InsightAPI.getRecommendation(this.profile.cookie, filterCategory)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.recommendations = result.product_link;
				} else {
					console.log('_getRecommendation', result)
				}
			}, error => {
				console.log('_getRecommendation', error)
			})
	}

	public goToAuthorPage () {

		let insightModal = this.modalCtrl.create(
			'UserDetailsPage', { info: this.insightData }
		);
		insightModal.present();
	}

	public openEditNote () {
		const callback = (nickname) => {
			this.reLoadData(false)
			this.insightData.nickname = nickname
		}
		openEditNoteForNickName(this.alertCtrl, this.translate, this.insightData, this.profile.cookie, callback.bind(this))
	}

	public updateUserPreference () {
		let exist = this.is_existing_customer == true ? true : null
		let remove = this.is_remove_two_month == true ? true : null
		let timestamp = this.is_remove_two_month == true ? new Date().getTime().toString() : null

		InsightAPI.updateUserPreference(
			this.profile.cookie, this.insightData.source, this.insightData.authorId,
			null, exist, remove, timestamp)
			.then((result: any) => {
				const isFail = (result.status == ResponseStatus.ERROR)
				!isFail && this.reLoadData(true)
				sendGenericUpdateAlert(this.alertCtrl, this.translate, isFail)
			}, error => {
				sendGenericUpdateAlert(this.alertCtrl, this.translate, true)
			})
	}

	private reLoadData (closeModal) {
		const errorCallback = (message) => {
			showError(this.alertCtrl, this.translate, message)
		}

		this.type == insightType.potential && assignPotentialToModal(this.profile.cookie, this.potential, errorCallback.bind(this))
		this.type == insightType.all && assignClientInsightToModal(this.profile.cookie, this.allClient, errorCallback.bind(this))

		closeModal && this.closeModal()
	}

	public removeInTwoMonth() {
		if (this.is_remove_two_month != true){ return false }

		const alert = this.alertCtrl.create({
			title: getTranslation(this.translate, 'INSIGHT.DETAILS.DELETE_PERIOD_INFO'),
			buttons: [{
				text: getTranslation(this.translate, 'GLOBAL_CANCEL_BUTTON_LABEL')
			},
			{
				text: getTranslation(this.translate, 'GLOBA_OK_BUTTON_LABEL'),
				handler: this.updateUserPreference.bind(this)
			}]
		})

		alert.present()
	}

	public updateSuggestionUseful (isUseful) {
		isUseful = (this.insightData.useful === isUseful) ? 'null' : isUseful

		InsightAPI.updateInsightUseful(
			this.profile.cookie, this.insightData.source, this.insightData._id, isUseful)
			.then((result: any) => {
				const isFail = (result.status == ResponseStatus.ERROR)
				!isFail && this.potential.updateUsefulData(this.insightData.source, this.insightData._id, isUseful)
			}, error => {
				console.log(error)
			})
	}

	closeModal () {
		this.view.dismiss()
	}

}
