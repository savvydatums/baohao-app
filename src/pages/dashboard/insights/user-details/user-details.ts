import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { InsightAPI } from '../../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../../api/Comms';
import { TInsightPost, TInsightSummary } from '../../../../model/types';
import { ProfileModel } from '../../../../model/ProfileModel';
import {Chart} from 'chart.js'
import { createBarChartOptions } from '../../../../utils/graph-util';
import { keywordsSettings } from '../settings/settings'
import { openEditNoteForNickName } from '../../../../utils/alert-generic';
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
	 // use pagination instead of top or all
	summaryRanked: TInsightSummary[] = [];
	userDetails: TInsightPost;
	selectedSummary: TInsightSummary;

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
		InsightAPI.get_author_category_list(cookie, authorId, source)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					console.log('getAuthorCategoryList', result);
					this.userDetails.categorySummary = result.results
					this.assignSummaryData(result.results, this.userDetails.categories[0])
				} else {
					//this.showError(result.message);
				}
			}, error => {
				//this.showError(error);
			});
	}

	private assignSummaryData (summaryData, shownCategory) {
		this.getCategoryStory(this.profile.cookie, this.userDetails.authorId, this.userDetails.source, shownCategory)
		let ranked = [];

		for (let key in summaryData) {
			ranked.push({
				key,
				amount: summaryData[key],
				story: []
			})
		}
		ranked.sort((a, b) => (a.key.localeCompare(b.key))).sort((a, b) => (b.amount - a.amount));
		this.summaryRanked = ranked
		this.createInsightGraph()
	}

	private getCategoryStory(cookie, authorid, source, category) {
		InsightAPI.getInsightByAuthorId(cookie, authorid, source, category)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					console.log('getAuthorInfo', result);
					this.summaryRanked.map((item:any) => {
						if (item.key === category) {
							item.story = result.results
							this.selectedSummary = item
						}
					})
				} else {
					//this.showError(result.message);
				}
			}, error => {
				//this.showError(error);
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
			const settings = keywordsSettings.allClient[item.key]

			if (withinRange && settings) {
				data.push(item.amount);
				labels.push(settings.en);
				colors.push(settings.color)
			}
		})
		console.log(data, labels, colors, max, min)

		return { data, labels, colors, callback: this.clicked.bind(this) }
	}

	clicked(evt) {
		const activeElement = this.barChart.getElementAtEvent(evt)
		let barIndex = (activeElement[0] && activeElement[0]._index) ? activeElement[0]._index : null
		let xIndex = this.barChart.scales['x-axis-0'].getValueForPixel(evt.x);
		console.log(xIndex, 'get story')

		let summaryRankedIndex = (this.currentPage - 1) * this.itemPerPage + (barIndex || xIndex)

		// check wether clicked or not
		this.selectedSummary = this.summaryRanked[summaryRankedIndex]
		if (!this.selectedSummary.story && this.selectedSummary.amount > 0) {
			// not always shown ?
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
