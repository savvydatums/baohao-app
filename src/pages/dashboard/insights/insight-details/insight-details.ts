import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { renderTimeStampInNumber } from '../../../../utils/insight-util';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { InsightAPI } from '../../../../api/InsightAPI';
import { keywordsSettings, insightType} from '../settings/settings';
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

	constructor(
		public navCtrl: NavController,
		private view: ViewController,
		public profile: ProfileModel,
		public translate: TranslateService,
		public navParams: NavParams) {
	}

	ionViewWillLoad() {
		this.insightData = this.navParams.get('info')
		this.type = this.navParams.get('type')
		const mainCategory = this._getCategoryMapping(this.insightData.categories)
		this.info = keywordsSettings[this.type][mainCategory]

		//this.getAuthorInfo(this.profile.cookie, authorInfo.authorId, authorInfo.source, category)
		console.log(this.insightData, this.type, this.info, mainCategory)
		if (this.type == insightType.potential) {
			this._getRecommendation()
		} else {
		}
	}

	private _getCategoryMapping(categories) {
		return categories[0].replace(" & ", "_").replace("/", "_")
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

	// private getAuthorInfo (cookie, authorid, source, category) {
	// 	InsightAPI.getInsightByAuthorId(cookie, authorid, source, category)
	// 		.then((result: any) => {
	// 			if (result.status == InsightResponseStatus.SUCCESS) {
	// 				this.authorData = result.results;
	// 			} else {
	// 				//this.showError(result.message);
	// 			}
	// 		}, error => {
	// 			//this.showError(error);
	// 		});
	// }

	closeModal () {
		this.view.dismiss()
	}

}
