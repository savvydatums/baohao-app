import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InsightAPI } from '../../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../../api/Comms';
import { ProfileModel } from '../../../../model/ProfileModel';

@IonicPage()
@Component({
	selector: 'page-insight-details',
	templateUrl: 'insight-details.html',
})
export class InsightDetailsPage {

	public insightData: object;
	public authorData: object;

	constructor(
		public navCtrl: NavController,
		private view: ViewController,
		public profile: ProfileModel,
		public navParams: NavParams) {
	}

	ionViewWillLoad() {
		const authorInfo = this.navParams.get('profile');
		this.insightData = authorInfo;
		const category = authorInfo.categories[0];
		this.getAuthorInfo(this.profile.cookie, authorInfo.authorId, authorInfo.source, category);
	}

	private getAuthorInfo (cookie, authorid, source, category) {
		InsightAPI.getInsightByAuthorId(cookie, authorid, source, category)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					console.log('load author info', result);
					this.authorData = result.results;
				} else {
					//this.showError(result.message);
				}
			}, error => {
				//this.showError(error);
			});
	}

	public processUserAllData () {

	}

	public renderTimeStamp(timestamp: number) {
		const time = parseInt(timestamp + '000')
		return new Date(time).toDateString()
	}

	closeModal () {
		this.view.dismiss()
	}

}
