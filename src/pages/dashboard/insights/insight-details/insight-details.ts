import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { renderTimeStampInNumber, getKeywordInfo, getKeywordText } from '../../../../utils/insight-util';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { InsightAPI } from '../../../../api/InsightAPI';
import { insightType} from '../settings/settings';
import { TInsightPost } from '../../../../model/types';
import { InsightResponseStatus } from '../../../../api/Comms';

@IonicPage()
@Component({
	selector: 'insight-details',
	templateUrl: 'insight-details.html',
})
export class InsightDetailsPage {

	insightData: TInsightPost;
	type: string;
	recommendations: object[] = [];
	info: object;
	renderTimeStamp: Function = renderTimeStampInNumber;
	getKeywordInfo: Function = getKeywordInfo;
	getKeywordText: Function = getKeywordText;

	constructor(
		public navCtrl: NavController,
		private view: ViewController,
		public profile: ProfileModel,
		public translate: TranslateService,
		public navParams: NavParams,
		private alertCtrl: AlertController) {
	}

	ionViewWillLoad() {
		this.insightData = this.navParams.get('info')
		this.type = this.navParams.get('type')
		const mainCategory = this.insightData.categories[0]
		this.info = getKeywordInfo(this.type, mainCategory);
		if (this.type == insightType.potential) {
			this._getRecommendation()
		} else {

		}
	}

	private _getRecommendation () {
		InsightAPI.getRecommendation(this.profile.cookie, this.insightData.categories[0])
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.recommendations = result.product_link;
					console.log (this.recommendations)
				} else {
					console.log('_getRecommendation', result)
				}
			}, error => {
				console.log('_getRecommendation', error)
			})
	}

	public goToAuthorPage () {
		// open another model
		console.log('goToAuthorPage')
	}

	public openEditNote() {
		const alert = this.alertCtrl.create({
			title: 'Add a nick name',
			inputs: [
				{
					name: 'nickname',
					placeholder: 'nickname'
				}
			],
			buttons: [{
				text: 'cancel'
			},
			{
				text: 'save',
				handler: data => {
					console.log ('data', data)
					//InsightAPI.edit_user_profile();
				}
			}]
		})

		alert.present()

	}

	closeModal () {
		this.view.dismiss()
	}

}
