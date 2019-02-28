import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsightsModel } from './../../../../model/InsightsModel';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent, THEME } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar'
import { keywordColors } from '../settings/settings';

@IonicPage({ name: "listView", segment: "listView" })
@Component({
  selector: 'listView',
  templateUrl: 'index.html'
})

export class ListView {

	searchValue: string;
	categoryColors: object;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

	constructor(
		public navCtrl: NavController,
		public insights: InsightsModel,
		public translate: TranslateService,
	) {}

	ionViewDidLoad () {
		this.header.setTheme(THEME.LIST);
	}

	ionViewWillEnter() {
		this.categoryColors = keywordColors;
		this.configSearchBar();
	}

	public renderTimeStamp (timestamp:number) {
		const time = parseInt(timestamp + '000')
		return new Date(time).toDateString()
	}

	private configSearchBar():void {
		// this.searchBar.bindSearchCallBack(() => {
		// 	console.log('input some search function callback')
		// });
		// this.searchBar.bindCategoryCallback((key) => {
		// 	console.log ('click', key)
		// });
	}
}
