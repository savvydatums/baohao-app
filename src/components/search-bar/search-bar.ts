import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
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

	@Input() summary: [];
  	@Input() selected: string;
  	searchOpened: boolean;
  	inputValue: string;

	constructor(
		public navCtrl: NavController,
		public insights: InsightsModel,
		public profile: ProfileModel,
		public translate: TranslateService) {
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

		InsightAPI.getGroupInsight(this.profile.cookie, groupId)
			.then(result => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					self.insights.assignGroupData(result.results, groupId)
					self.navCtrl.setRoot(self.navCtrl.getActive().component);
					// self.getInsightSummary(cookie)
					// self.showLoading(false)
				} else {
					// this.showError(result.message);
				}
			}, error => {
				// this.showError(error);
			});
	}

	public onSearch() {
		console.log(this.inputValue); // TODO, no value yet
		this.searchOpened = false;
	}

	public toggleSearch() {
		this.searchOpened = !this.searchOpened;
	}

	public getGroupName(key) {
		const lang = this.translate.currentLang || this.translate.defaultLang
		return this.translate.translations[lang].INSIGHT.GROUP[key]
	}
}
