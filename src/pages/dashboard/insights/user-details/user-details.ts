import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { InsightAPI } from '../../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../../api/Comms';
import { TInsightPost, TInsightSummary } from '../../../../model/types';
import { ProfileModel } from '../../../../model/ProfileModel';
import { Chart } from 'chart.js'
import { createBarChartOptions } from '../../../../utils/graph-util';
import { keywordsSettings } from '../settings/settings'
import { openEditNoteForNickName, showError } from '../../../../utils/alert-generic';
import { TranslateService } from '@ngx-translate/core';
import { renderTimeStampInNumber } from '../../../../utils/insight-util';

@IonicPage()
@Component({
	selector: 'insight-details',
	templateUrl: 'user-details.html',
})
export class UserDetailsPage {

	itemPerPage: number = 4;
	currentPage: number = 1;
	summaryRanked: TInsightSummary[] = [];
	userDetails: TInsightPost;
	selectedSummary: TInsightSummary;
	currentLang: string;

	@ViewChild('barChartView') barChartView;
	barChart: any;
	openEditNote: Function = openEditNoteForNickName;
	renderTimeStamp: Function = renderTimeStampInNumber;

	constructor(
		public navCtrl: NavController,
		public translate: TranslateService,
		private view: ViewController,
		public profile: ProfileModel,
		private alertCtrl: AlertController,
		public navParams: NavParams) {
	}

	ionViewWillLoad() {
		this.userDetails = this.navParams.get('info');
		this.getAuthorCategoryList(this.profile.cookie, this.userDetails.authorId, this.userDetails.source)
	}

	private getAuthorCategoryList (cookie, authorId, source) {
		InsightAPI.getAuthorCategoryList(cookie, authorId, source)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.userDetails.categorySummary = result.results
					this.assignSummaryData(result.results, this.userDetails.categories[0])
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
	}

	private assignSummaryData (summaryData, shownCategory) {
		this.getCategoryStory(this.profile.cookie, this.userDetails.authorId, this.userDetails.source, shownCategory)
		let ranked = [];

		for (let key in summaryData) {
			ranked.push({
				key,
				amount: summaryData[key],
				story: [],
				settings: keywordsSettings.allClient[key]
			})
		}
		ranked.sort((a, b) => (a.key.localeCompare(b.key))).sort((a, b) => (b.amount - a.amount));
		this.summaryRanked = ranked
		this.currentLang = this.translate.currentLang || this.translate.defaultLang
		this.createInsightGraph()
	}

	private getCategoryStory(cookie, authorid, source, category) {
		InsightAPI.getInsightByAuthorId(cookie, authorid, source, category)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.summaryRanked.map((item:any) => {
						if (item.key === category) {
							item.story = result.results
							this.selectedSummary = item
						}
					})
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
	}

	private createInsightGraph () {
		const data = this.generateGraphData()
		this.barChart = new Chart(this.barChartView.nativeElement, createBarChartOptions(data));
	}

	private generateGraphData () {
		const max = this.itemPerPage * this.currentPage;
		const min = (this.itemPerPage * (this.currentPage - 1));

		let data = [];
		let labels = [];
		let colors = [];

		this.summaryRanked.map ((item:any, key) => {
			const withinRange = key < max && key >= min
			if (withinRange && item.settings) {
				data.push(item.amount);
				labels.push(item.settings[this.currentLang]);
				colors.push(item.settings.color)
			}
		})

		return { data, labels, colors, callback: this.chartClicked.bind(this) }
	}

	chartClicked(evt) {
		const activeElement = this.barChart.getElementAtEvent(evt)
		let barIndex = (activeElement[0] && activeElement[0]._index) ? activeElement[0]._index : null
		let xIndex = this.barChart.scales['x-axis-0'].getValueForPixel(evt.x);
		let summaryRankedIndex = (this.currentPage - 1) * this.itemPerPage + (barIndex || (xIndex-1))
		if (summaryRankedIndex == -1) { summaryRankedIndex = 0 }
		this.selectedSummary = this.summaryRanked[summaryRankedIndex]

		if (this.selectedSummary.story.length <= 0 && this.selectedSummary.amount > 0) {
			this.getCategoryStory(this.profile.cookie, this.userDetails.authorId, this.userDetails.source, this.selectedSummary.key)
		}
	}

	changePage(addNumber:number) {
		this.currentPage += addNumber;
		const newPageData = this.generateGraphData();
		this.barChart.data.labels = newPageData.labels
		this.barChart.data.datasets[0].data = newPageData.data
		this.barChart.data.datasets[0].backgroundColor = newPageData.colors
		this.barChart.update();
	}

	closeModal() {
		this.view.dismiss()
	}
}
