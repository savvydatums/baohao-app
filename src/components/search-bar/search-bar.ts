import { Component, Input } from '@angular/core';
import {NavController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'search-bar',
	templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

	@Input() summary: [];
  	@Input() selected: string;
  	objectKeys = Object.keys;
  	searchOpened: boolean;
  	inputValue: string;

	constructor(
		public navCtrl: NavController,
		public translate: TranslateService) {
		this.inputValue = '';
	}

	ionViewWillEnter() {
		this.searchOpened = false; // default
	}
	// maybe use service for that.
	// animate move current cursor to new one

	public onGroupClick() {

	}

	public onSearch() {
		console.log(this.inputValue); // TODO, no value yet
		this.searchOpened = false;
	}

	// public bindSearchCallBack (ck:Function) {
	// 	this.searchCallback = ck;
	// }

	// public bindCategoryCallback (ck:Function) {
	// 	this.categoryCallback = ck;
	// }

	public updateInput (event) {
		this.inputValue = event.target.value;
	}

	public changeSelected(key:string) {
		//this.categoryCallback(key);
	}


	public toggleSearch() {
		this.searchOpened = !this.searchOpened;
	}

	public getGroupName(key) {
		const lang = this.translate.currentLang || this.translate.defaultLang
		return this.translate.translations[lang].INSIGHT.GROUP[key]
	}
}
