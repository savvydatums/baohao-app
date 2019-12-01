import { Component, Input } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AllInsightsModel } from '../../model/AllInsightsModel';
import { ProfileModel } from '../../model/ProfileModel';
import { FilterPage } from '../../pages/dashboard/filter'
import { assignClientInsightToModal } from '../../utils/insight-util';

@Component({
	selector: 'search-bar',
	templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

	@Input() searchHandler: Function;
	@Input() selected: string;
	@Input() filters?: string[];
	@Input() fetchTranslation: Function;
	@Input() page: string;
	inputValue: string;
	loader: any;
	
	constructor(
		public navCtrl: NavController,
		public insights: AllInsightsModel,
		public profile: ProfileModel,
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
	// below only apply to all client
	public onSearchHandler(keyword) {
		const search = {
			keyword: keyword, 
			searchtype: this.insights.getOptions(),
			categories: this.insights.getCategories()
		}
		this.insights.keyword = keyword
		this.inputValue = keyword
		assignClientInsightToModal(this.profile.cookie, this.insights, 1, search)
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
