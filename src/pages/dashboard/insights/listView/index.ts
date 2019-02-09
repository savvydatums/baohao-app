import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsightsModel } from './../../../../model/InsightsModel';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent, THEME } from '../../../../components/header/header';

@IonicPage({ name: "listView", segment: "listView" })
@Component({
  selector: 'listView',
  templateUrl: 'index.html'
})

export class ListView {

  shownList : object[];
  @ViewChild(HeaderComponent) header: HeaderComponent;

  constructor(
    public navCtrl: NavController,
    public insights: InsightsModel,
    public translate: TranslateService
  ) {}

  ionViewDidLoad () {
    this.getShowList()
    this.header.setTheme(THEME.LIST);
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
