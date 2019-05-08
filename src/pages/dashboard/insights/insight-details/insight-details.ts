import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { renderTimeStampInNumber } from '../../../../utils/insight-util';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
	selector: 'insight-details',
	templateUrl: 'insight-details.html',
})
export class InsightDetailsPage {

	insightData: object;
	authorData: object;
	currentKeyword: string;
	renderTimeStamp: Function = renderTimeStampInNumber;

	constructor(
		public navCtrl: NavController,
		private view: ViewController,
		public profile: ProfileModel,
		public translate: TranslateService,
		public navParams: NavParams) {
	}

	ionViewWillLoad() {
		const authorInfo = this.navParams.get('info')
		this.insightData = authorInfo
		const category = authorInfo.categories[0]
		this.currentKeyword = category
		//this.getAuthorInfo(this.profile.cookie, authorInfo.authorId, authorInfo.source, category)
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

	// public processUserAllData () {

	// }

	closeModal () {
		this.view.dismiss()
	}

}
