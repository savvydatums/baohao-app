import { Component } from '@angular/core';
import { AllClient } from '../insights/allclient/index';
import { ArchivePage } from '../archive/index';
import { ProfilePage } from '../profile/index';
import { AllInsightsModel } from '../../../model/AllInsightsModel';
import { IonicPage, NavController } from 'ionic-angular';
//import { redirectIfNotLogin } from '../../../utils/login-util';
import { ProfileModel } from '../../../model/ProfileModel';
import { InsightAPI } from '../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../api/Comms';
import { PotentialPage } from '../insights/potential';
import { PotentialLeadsModel } from '../../../model/PotentialLeadsModel';
import { insightTypes } from '../insights/settings/settings';

@IonicPage({ name: "DashboardPage", segment: "DashboardPage"})
@Component({
  selector: 'dashboardPage',
  templateUrl: 'index.html'
})

export class DashboardPage {

	tabProfile = ProfilePage;
	tabInsight = AllClient;
	tabPotential = PotentialPage;
	tabArchive = ArchivePage;
	loading = true;

	constructor(
		public navCtrl: NavController,
		public insights: AllInsightsModel,
		public potential: PotentialLeadsModel,
		public profile: ProfileModel) {
	}

	ionViewDidLoad() {
		//redirectIfNotLogin(this.navCtrl, this.profile);
	}

	ngAfterViewInit() {
		this.getPotentialLeads(this.profile.cookie, insightTypes.all)
		this.showLoading(true)
	}

	private getPotentialLeads (cookie, insightType) {
		let self = this
		InsightAPI.getPotentialInsight(cookie, insightType)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.potential.addData(result.results)
					self.getClientInsights(this.profile.cookie, this.insights.currentGroupId)
				} else {
					this.showError(result.message);
				}
			}, error => {
				this.showError(error);
			});
	}

	private getClientInsights(cookie, insightType) {
		let self = this
		InsightAPI.getAllClientInsight(cookie, insightType)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.insights.assignGroupData(result.results, insightType)
					self.showLoading(false)
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
}
