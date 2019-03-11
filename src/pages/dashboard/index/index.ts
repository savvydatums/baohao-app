import { Component } from '@angular/core';
import { ListView } from '../insights/listView/index';
import { ArchivePage } from '../archive/index';
import { ProfilePage } from '../profile/index';
import { InsightsModel } from '../../../model/InsightsModel';
import { IonicPage, NavController } from 'ionic-angular';
//import { redirectIfNotLogin } from '../../../utils/login-util';
import { ProfileModel } from '../../../model/ProfileModel';
import { InsightAPI } from '../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../api/Comms';

@IonicPage({ name: "DashboardPage", segment: "DashboardPage"})
@Component({
  selector: 'dashboardPage',
  templateUrl: 'index.html'
})

export class DashboardPage {

	tabProfile = ProfilePage;
	tabInsight = ListView;
	tabArchive = ArchivePage;
	loading = true;

	constructor(
		public navCtrl: NavController,
		public insights: InsightsModel,
		public profile: ProfileModel) {
	}

	ionViewDidLoad() {
		//redirectIfNotLogin(this.navCtrl, this.profile);
	}

	ngAfterViewInit() {
		this.getGroupInfo(this.profile.cookie, this.insights.currentGroupId)
		this.showLoading(true)
	}

	private getGroupInfo (cookie, groupId) {
		let self = this
		InsightAPI.getGroupInsight(cookie, groupId)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.insights.assignGroupData(result.results, groupId)
					self.getInsightSummary(cookie)
					self.showLoading(false)
				} else {
					this.showError(result.message);
				}
			}, error => {
				this.showError(error);
			});
	}

	private getInsightSummary(cookie) {
		InsightAPI.getInsightSummary(cookie)
			.then((result: any) => {
				if(result.status == InsightResponseStatus.SUCCESS) {
					this.insights.assignInsightSummary(result.results)
					this.showLoading(false)
				} else {
					this.showError(result.message);
				}
			}, error => {
				this.showError(error);
			});
	}

	private showLoading (show) {
		this.loading = show
	}

	private showError (message) {
		console.log ('error', message)
	}

  	tabChange(event) {
		console.log (event, this.tabProfile, this.tabInsight, this.tabArchive)
  	}
}
