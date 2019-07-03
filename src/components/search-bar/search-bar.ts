import { Component, Input } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AllInsightsModel } from '../../model/AllInsightsModel';
import { ProfileModel } from '../../model/ProfileModel';
import { FilterPopoverPage as FilterPage } from '../../pages/dashboard/filter'

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
		public modalCtrl: ModalController) {

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

	public onClean() {
		this.inputValue = ''
		this.onSearch()
	}

	public onSearchHandler(keyword) {
		this.insights.applyFilter2(keyword)
	}

	public onResetFilter(type) {
		this.insights.resetFilter(type)
	}

	public openFilter () {
		let filterModal = this.modalCtrl.create(
			FilterPage, {
				topOptions: this.insights.topOptions, 
				categories: this.insights.categories,
				searchHandler: this.onSearchHandler.bind(this),
				inputValue: this.inputValue
			});

		filterModal.present();
	}
}
