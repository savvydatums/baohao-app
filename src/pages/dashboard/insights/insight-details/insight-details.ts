import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { renderTimeStampInNumber, getKeywordInfo, getKeywordText, assignPotentialToModal, assignClientInsightToModal, assignAdvertToModal } from '../../../../utils/insight-util';
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
import { AdvertModel } from '../../../../model/AdvertModel';
import { platforms } from '../../../../app/app.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

declare var cordova: any;

@IonicPage()
@Component({
	selector: 'insight-details',
	templateUrl: 'insight-details.html',
})
export class InsightDetailsPage {

	is_existing_customer: boolean = false;
	is_remove_two_month: boolean = false;
	is_agent: boolean = null;
	platformClass: string = '';

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
		public advert: AdvertModel,
		public translate: TranslateService,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		private modalCtrl: ModalController, 
		private iab: InAppBrowser,
		private appAvailability: AppAvailability) {
	}

	ionViewWillLoad() {
		this.insightData = this.navParams.get('info')
		this.type = this.navParams.get('type')
		const mainCategory = this.insightData.categories[0]
		this.info = getKeywordInfo(this.type, mainCategory);

		(cordova.platformId === platforms.Ios) && (this.platformClass = 'ios');
		(cordova.platformId === platforms.Android) && (this.platformClass = 'android');

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
			this.insightData.nickname = nickname

			// TODO: this wait until we have author specific API
			// updateAuthorNickNameForModel(this.potential, this.insightData.authorId, this.insightData.source, nickname)
		}
		openEditNoteForNickName(this.alertCtrl, this.translate, this.insightData, this.profile.cookie, callback.bind(this))
	}

	public updateUserPreference () {
		let exist = this.is_existing_customer == true ? true : null
		let remove = this.is_remove_two_month == true ? true : null
		let agent = (typeof this.is_agent === 'boolean' ) ? this.is_agent : null
		let timestamp = this.is_remove_two_month == true ? new Date().getTime().toString() : null

		InsightAPI.updateUserPreference(
			this.profile.cookie, this.insightData.source, this.insightData.authorId,
			null, exist, remove, timestamp, agent)
			.then((result: any) => {
				const isFail = (result.status == ResponseStatus.ERROR)
				!isFail && this.reLoadData(true, agent)

				sendGenericUpdateAlert(this.alertCtrl, this.translate, isFail)
			}, error => {
				sendGenericUpdateAlert(this.alertCtrl, this.translate, true)
			})
	}

	private reLoadData (closeModal, isAgent?) {
		const errorCallback = (message) => {
			showError(this.alertCtrl, this.translate, message)
		}

		this.type == insightType.potential && assignPotentialToModal(this.profile.cookie, this.potential, 1, null, null, errorCallback.bind(this))
		this.type == insightType.all && assignClientInsightToModal(this.profile.cookie, this.allClient, 1, null, errorCallback.bind(this))
		isAgent == true &&  assignAdvertToModal(this.profile.cookie, this.advert, 1) 

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
		const useful = (this.insightData.useful == isUseful) ? 'null' : isUseful

		InsightAPI.updateInsightUseful(
			this.profile.cookie, this.insightData.source, this.insightData._id, useful.toString())
			.then((result: any) => {
				const isFail = (result.status == ResponseStatus.ERROR)
				!isFail && this.potential.updateUsefulData(this.insightData.source, this.insightData._id, useful)
			}, error => {
				console.log(error)
			})
	}

	closeModal () {
		this.view.dismiss()
	}

	public openExternalLink(link) {
		const browser = this.iab.create(link, '_system');
		browser.show();
	}

	public linkToFbPage () {
		const fbUrl = `https://m.facebook.com/${this.insightData.authorId}`
		const browser = this.iab.create(fbUrl, '_system');
		browser.show();	
	}

	openFBProfilePage () {
		let appUrl, app;
		let webUrl = `https://m.facebook.com/${this.insightData.authorId}`
		
		if (cordova.platformId === platforms.Ios) {
			appUrl = `fb://profile/1487350501` // this is tested on ios
			app = 'fb://'
		} else if (cordova.platformId === platforms.Android) {
			app = 'com.facebook.katana'
			appUrl = `fb://profile/1487350501` // this is tested on android, worked https://lookup-id.com/ find my app id

			//let appUrl = `fb://profile?id=1487350501` // this will work in android as well
			//https://stackoverflow.com/questions/4810803/open-facebook-page-from-android-app
			// profile page with id, in my account doesn't work
		} 

		alert('cordova.platformId:' + cordova.platformId + '/' + appUrl + '/' + app);

		this.appAvailability.check(app)
			.then(
				(yes) => {
					alert(app + yes + 'exist: appUrl' + appUrl);
					const browser = this.iab.create(appUrl, '_system');
					browser.show();	
				},
				(no) => {
					alert(app + no +'not exist: webUrl' + webUrl);// undefined url and this
					this.openWebUrl() // fall back on everything
				}
			);
	}

	openWebUrl () {
		let webUrl = `https://m.facebook.com/${this.insightData.authorId}`
		const browser = this.iab.create(webUrl, '_system');
		browser.show();
	}
}
