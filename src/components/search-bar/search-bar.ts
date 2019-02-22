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

  constructor(public navCtrl: NavController) {
    this.inputValue = '';
  }

  ionViewWillEnter() {
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

  public updateInput (event) {
    this.inputValue = event.target.value;
  }

  public changeSelected(key:string) {
    this.categoryCallback(key);
  }

  public onSearch() {
    console.log(this.inputValue); // TODO, no value yet
    this.searchOpened = false;
  }

  public toggleSearch() {
    this.searchOpened = !this.searchOpened;
  }
}
