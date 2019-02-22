import { Component } from '@angular/core';
import { ListView } from '../insights/listView/index';
import { ArchivePage } from '../archive/index';
import { ProfilePage } from '../profile/index';
import { InsightsModel } from '../../../model/InsightsModel';
import { insightsMockResponse } from '../../../api/insights-mock-data';
import { IonicPage } from 'ionic-angular';

@IonicPage({ name: "DashboardPage", segment: "DashboardPage"})
@Component({
  selector: 'dashboardPage',
  templateUrl: 'index.html'
})
export class DashboardPage {

  tabProfile = ProfilePage;
  tabInsight = ListView;
  tabArchive = ArchivePage;

  constructor( public insightsModel: InsightsModel) {

  }

  ngAfterViewInit() {
    // insert all response data into here
    this.insightsModel.medicalList = insightsMockResponse.result.medical;
    this.insightsModel.savingAndLife = insightsMockResponse.result.savingAndLife;
    this.insightsModel.investment = insightsMockResponse.result.investment;
    this.insightsModel.general = insightsMockResponse.result.general;
  }

  tabChange(event) {
    console.log (event, this.tabProfile, this.tabInsight, this.tabArchive)
  }
}
