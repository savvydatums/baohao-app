import { Component } from '@angular/core';
import { AllClient } from '../insights/allclient/index';
import { ArchivePage } from '../archive/index';
import { ProfilePage } from '../profile/index';
import { AllInsightsModel } from '../../../model/AllInsightsModel';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { InsightAPI } from '../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../api/Comms';
import { PotentialPage } from '../insights/potential';
import { PotentialLeadsModel } from '../../../model/PotentialLeadsModel';
import { insightFilterTypes } from '../insights/settings/settings';
import { showError } from '../../../utils/alert-generic';
import { TranslateService } from '@ngx-translate/core';
import { AdvertPage } from '../advert/index';

@IonicPage({ name: "DashboardPage", segment: "DashboardPage"})
@Component({
  selector: 'dashboardPage',
  templateUrl: 'index.html'
})

export class DashboardPage {

	tabProfile = ProfilePage;
	tabAdvert = AdvertPage;
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
		
		this.insights.setCategoryInfo()
	}

	ngAfterViewInit() {
		this.getPotentialLeads(this.profile.cookie, insightFilterTypes.all)
		this.showLoading(true)
	}

	private getPotentialLeads (cookie, insightType) {
		let self = this
		const currentLoadPage = 1
		InsightAPI.getPotentialInsight(cookie, insightType, currentLoadPage)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					console.log('get potential insights', result)
					self.potential.addData(result.results, currentLoadPage, result.num_of_pages)
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
		const currentLoadPage = 1
		InsightAPI.getAllClientInsight(cookie, insightType, currentLoadPage)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					console.log('get all client insights', result)
					self.insights.addData(result.results, currentLoadPage, result.num_of_pages)	
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
