import { Component, Input } from '@angular/core';
import { NavController, LoadingController, PopoverController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AllInsightsModel } from '../../model/AllInsightsModel';
import { ProfileModel } from '../../model/ProfileModel';
import { FilterPopoverPage } from '../../pages/dashboard/filter'

@Component({
	selector: 'search-bar',
	templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

	@Input() searchHandler: Function;
	@Input() selected: string;
	@Input() filters: string[];
	@Input() page: string;
	inputValue: string;
	loader: any;

	constructor(
		public navCtrl: NavController,
		public insights: AllInsightsModel,
		public profile: ProfileModel,
		public translate: TranslateService,
		public loadingCtrl: LoadingController,
		public popoverCtrl: PopoverController) {

		this.inputValue = '';
		console.log(this.page)
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

	public onClean() {
		this.inputValue = ''
		this.onSearch()
	}

	public onSearchHandler(filters, categories) {
		this.insights.applyFilter2(this.inputValue, filters, categories)
	}

	public onResetFilter(type) {
		this.insights.resetFilter(type)
	}

	public openFilter (event) {
		let popover = this.popoverCtrl.create(
			FilterPopoverPage, {
				topOptions: this.insights.topOptions, 
				categories: this.insights.categories,
				searchHandler: this.onSearchHandler.bind(this),
				resetFilterHandler: this.onResetFilter.bind(this),
				inputValue: this.inputValue
			});
		popover.present({ ev: event });
	}
}
