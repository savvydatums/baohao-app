import { Component, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { InsightsModel } from '../../model/InsightsModel';
import { InsightAPI } from '../../api/InsightAPI';
import { ProfileModel } from '../../model/ProfileModel';
import { InsightResponseStatus } from '../../api/Comms';

@Component({
	selector: 'search-bar',
	templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

	@Input() summary: object[];
	@Input() selected: string;
	searchOpened: boolean;
	inputValue: string;
	loader: any;

	constructor(
		public navCtrl: NavController,
		public insights: InsightsModel,
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

	public onGroupClick(groupId:number) {
		let self = this

		this.createLoader()
		this.loader.present()

		InsightAPI.getGroupInsight(this.profile.cookie, groupId)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.insights.assignGroupData(result.results, groupId)
					self.navCtrl.setRoot(self.navCtrl.getActive().component);
					// self.getInsightSummary(cookie)
				} else {
					// this.showError(result.message);
				}
				this.loader.dismiss()
			}, error => {
				this.loader.dismiss()
				// this.showError(error);
			});
	}

	public createLoader() {
		this.loader = this.loadingCtrl.create({
			spinner: 'crescent',
			content: "Loading...",
			cssClass: 'loading-s'
		});
	}

	public onSearch() {
		console.log(this.inputValue);
		this.searchOpened = false;
		if (this.inputValue && this.inputValue.length > 0) {
			this.insights.applyFilter(this.inputValue);
		}

		// TODO, next, apply search into current filter
	}

	public toggleSearch() {
		this.searchOpened = !this.searchOpened;
	}

	public getGroupName(key) {
		const lang = this.translate.currentLang || this.translate.defaultLang
		return this.translate.translations[lang].INSIGHT.GROUP[key]
	}
}
