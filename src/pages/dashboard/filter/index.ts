import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({ name: "filter", segment: "filter"})
@Component({
  selector: 'filter',
  templateUrl: 'index.html'
})
export class FilterPage {

  categories: object[];
  topOptions: object[];
  inputValue: string;
  searchHandler: Function;
  currentLang: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    private view: ViewController) {
      this.topOptions = this.navParams.get('topOptions');
      this.categories = this.navParams.get('categories');
      this.inputValue = this.navParams.get('inputValue');
      this.searchHandler = this.navParams.get('searchHandler');
  }

  ionViewWillEnter() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang
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
