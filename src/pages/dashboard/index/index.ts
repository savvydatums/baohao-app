import { Component } from '@angular/core';
import { ListView } from '../insights/listView/index';
import { ArchivePage } from '../archive/index';
import { ProfilePage } from '../profile/index';
import { InsightsModel } from '../../../model/InsightsModel';
import { insightsMockResponse } from '../../../api/insights-mock-data';
import { IonicPage, NavController } from 'ionic-angular';
import { redirectIfNotLogin } from '../../../utils/login-util';
import { ProfileModel } from '../../../model/ProfileModel';

@IonicPage({ name: "DashboardPage", segment: "DashboardPage"})
@Component({
  selector: 'dashboardPage',
  templateUrl: 'index.html'
})
export class DashboardPage {

	tabProfile = ProfilePage;
	tabInsight = ListView;
	tabArchive = ArchivePage;

  	constructor(
		public navCtrl: NavController,
		public insights: InsightsModel,
		public profile: ProfileModel) {

  	}

	ionViewDidLoad() {
		//redirectIfNotLogin(this.navCtrl, this.profile);
	}

  	ngAfterViewInit() {
		// insert all response data into here
		this.insights.medicalList = insightsMockResponse.result.medical;
		this.insights.savingAndLife = insightsMockResponse.result.savingAndLife;
		this.insights.investment = insightsMockResponse.result.investment;
		this.insights.general = insightsMockResponse.result.general;
  	}

  	tabChange(event) {
		console.log (event, this.tabProfile, this.tabInsight, this.tabArchive)
  	}
}
