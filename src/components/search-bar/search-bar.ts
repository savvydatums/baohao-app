import { Component, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AllInsightsModel } from '../../model/AllInsightsModel';
import { ProfileModel } from '../../model/ProfileModel';

@Component({
	selector: 'search-bar',
	templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

	@Input() searchHandler: Function;
	@Input() selected: string;
	@Input() filters: string[];
	searchOpened: boolean;
	inputValue: string;
	loader: any;

	constructor(
		public navCtrl: NavController,
		public insights: AllInsightsModel,
		public profile: ProfileModel,
		public translate: TranslateService,
		public loadingCtrl: LoadingController) {
		this.inputValue = '';
	}

	ionViewWillEnter() {
		this.searchOpened = false; // default
	}

	public updateInput (event) {
		this.inputValue = event.target.value;
	}

	public onFilterClick (item) {
		if (this.selected == item) {
			this.selected = null
		} else {
			this.selected = item;
		}
		this.searchHandler(this.inputValue, this.selected);
	}

	public onSearch() {
		console.log(this.inputValue);
		this.searchOpened = false;
		if (this.inputValue && this.inputValue.length > 0) {
			this.searchHandler(this.inputValue, this.selected)
		}
	}
}
