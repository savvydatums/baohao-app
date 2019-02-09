import { Component, Input } from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

  @Input() categories: object;
  @Input() selected: string;
  objectKeys = Object.keys;
  searchOpened: boolean;
  inputValue: string;

  categoryCallback: Function;
  searchCallback: Function;

  constructor(public navCtrl: NavController) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter', this.categories)
    this.searchOpened = false; // default
  }
  // maybe use service for that.
  // animate move current cursor to new one

  public bindSearchCallBack (ck:Function) {
    this.searchCallback = ck;
  }

  public bindCategoryCallback (ck:Function) {
    this.categoryCallback = ck;
  }

  public changeSelected(key:string) {
    this.categoryCallback(key);
  }

  public onSearch() {
    console.log(this.inputValue);
    this.searchOpened = false;
  }

  public toggleSearch() {
    this.searchOpened = !this.searchOpened;
  }
}
