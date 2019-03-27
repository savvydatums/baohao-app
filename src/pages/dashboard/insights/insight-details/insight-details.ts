import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InsightAPI } from '../../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../../api/Comms';
import { ProfileModel } from '../../../../model/ProfileModel';

@IonicPage()
@Component({
	selector: 'insight-details',
	templateUrl: 'insight-details.html',
})
export class InsightDetailsPage {

	public insightData: object;
	public authorData: object;
	public currentKeyword: string;

	constructor(
		public navCtrl: NavController,
		private view: ViewController,
		public profile: ProfileModel,
		public navParams: NavParams) {
	}

	ionViewWillLoad() {
		const authorInfo = this.navParams.get('profile')
		this.insightData = authorInfo
		const category = authorInfo.categories[0]
		this.currentKeyword = category
		this.getAuthorInfo(this.profile.cookie, authorInfo.authorId, authorInfo.source, category)
	}

	private getAuthorInfo (cookie, authorid, source, category) {
		InsightAPI.getInsightByAuthorId(cookie, authorid, source, category)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
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
		const year = new Date(time).getFullYear()
		const month = new Date(time).getMonth() + 1
		const date = new Date(time).getDate()
		const hour = new Date(time).getHours()
		const minutes = new Date(time).getMinutes()

		return `${year} ${month} ${date} | ${hour}.${minutes}`
	}

	closeModal () {
		this.view.dismiss()
	}

}
