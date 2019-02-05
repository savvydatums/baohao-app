import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsightsModel } from './../../../../model/InsightsModel';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({ name: "listView", segment: "listView" })
@Component({
  selector: 'dashboard',
  templateUrl: 'index.html'
})

export class ListView {

  shownList : object[];
  //@ViewChild(DashboardHeaderComponent) viewChild: DashboardHeaderComponent;

  //title: string;
  //currentPage: number;

  constructor(
    public navCtrl: NavController,
    public insights: InsightsModel,
    public translate: TranslateService
  ) {}

  ngAfterViewInit () {
    this.getShowList()
    console.log ('showList', this.shownList)
  }

  public getShowList (listName?) {
    // get the stuff from first Insights
    if (!listName) {
      this.shownList = this.insights.medicalList
    } else {
      this.shownList = this.insights[listName]
    }
  }
}
