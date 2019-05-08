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

	public updateInput (event) {
		this.inputValue = event.target.value;
	}

	public onFilterClick (item) {
		this.selected = (this.selected == item) ? null : item;
		this.searchHandler(this.inputValue, this.selected);
	}

	public onSearch() {
		this.searchHandler(this.inputValue, this.selected)
	}
}
