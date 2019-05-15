import { Component } from '@angular/core';
import { AllClient } from '../insights/allclient/index';
import { ArchivePage } from '../archive/index';
import { ProfilePage } from '../profile/index';
import { AllInsightsModel } from '../../../model/AllInsightsModel';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
//import { redirectIfNotLogin } from '../../../utils/login-util';
import { ProfileModel } from '../../../model/ProfileModel';
import { InsightAPI } from '../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../api/Comms';
import { PotentialPage } from '../insights/potential';
import { PotentialLeadsModel } from '../../../model/PotentialLeadsModel';
import { insightFilterTypes } from '../insights/settings/settings';
import { showError } from '../../../utils/alert-generic';
import { TranslateService } from '@ngx-translate/core';

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
		private alertCtrl: AlertController,
		public translate: TranslateService,
		public profile: ProfileModel) {
	}

	ionViewDidLoad() {
		//redirectIfNotLogin(this.navCtrl, this.profile);
	}

	ngAfterViewInit() {
		this.getPotentialLeads(this.profile.cookie, insightFilterTypes.all)
		this.showLoading(true)
	}

	private getPotentialLeads (cookie, insightType) {
		let self = this
		InsightAPI.getPotentialInsight(cookie, insightType)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.potential.addData(result.results)
					self.getClientInsights(this.profile.cookie, insightType)
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
	}

	private getClientInsights(cookie, insightType) {
		let self = this
		InsightAPI.getAllClientInsight(cookie, insightType)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.insights.addData(result.results)
					self.showLoading(false)
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
	}

	private showLoading (show) {
		this.loading = show
	}
}
