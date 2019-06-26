import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage({ name: "filter", segment: "filter"})
@Component({
  selector: 'filter',
  templateUrl: 'index.html'
})
export class FilterPopoverPage {

  categories: object[];
  topOptions: object[];
  inputValue: string;
  searchHandler: Function;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController) {
      this.topOptions = this.navParams.get('topOptions');
      this.categories = this.navParams.get('categories');
      this.inputValue = this.navParams.get('inputValue');
      this.searchHandler = this.navParams.get('searchHandler');
  }

  public updateAllCategoriesStatus(boolean) {
    this.categories.map((item:any) =>  item.checked = boolean)
  }

  public updateCategoryStatus(key) {
    this.categories.map((item:any) => {
        if (item.value == key) {
          item.checked = !item.checked
        }
      })
  }

  public clearTextAndOptions(){
    this.inputValue = ''
    this.topOptions.map((item:any) =>  item.checked = false)
  }

  public applyFilterToModel() {
    this.searchHandler(this.inputValue)
    this.view.dismiss()
  }

  public closeModal() {
    this.searchHandler(this.inputValue)
    this.view.dismiss()
  }

}
