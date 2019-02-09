import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsightsModel } from './../../../../model/InsightsModel';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent, THEME } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar'

@IonicPage({ name: "listView", segment: "listView" })
@Component({
  selector: 'listView',
  templateUrl: 'index.html'
})

export class ListView {

  shownList : object[];
  categoriesCount: object;
  selected: string;
  searchValue: string;

  @ViewChild(HeaderComponent) header: HeaderComponent;
  @ViewChild(SearchBarComponent) searchBar: SearchBarComponent;

  constructor(
    public navCtrl: NavController,
    public insights: InsightsModel,
    public translate: TranslateService
  ) {}

  ionViewDidLoad () {
    this.getShowList();
    this.header.setTheme(THEME.LIST);
    this.categoriesCount = this.insights.getCategoriesCount();
  }

  ionViewWillEnter() {
    this.configSearchBar();
  }

  public getShowList (listName?) {
    if (!listName) {
      this.shownList = this.insights.medicalList
      this.selected = 'medicalList'
    } else {
      this.shownList = this.insights[listName]
      this.selected = listName
    }
  }

  private configSearchBar():void {
    this.searchBar.bindSearchCallBack(() => { console.log('input some search function callback') });
    this.searchBar.bindCategoryCallback((key) => { this.selected = key });
  }
}
