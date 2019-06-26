import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({ name: "filter", segment: "filter"})
@Component({
  selector: 'filter',
  templateUrl: 'index.html'
})
export class FilterPopoverPage {

  categories: object[];
  topOptions: object[];
  searchHandler: Function;
  resetFilterHandler: Function;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.topOptions = this.navParams.get('topOptions');
      this.categories = this.navParams.get('categories');
      this.searchHandler = this.navParams.get('searchHandler');
      this.resetFilterHandler = this.navParams.get('resetFilterHandler');
  }
}
