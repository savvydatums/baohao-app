import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { InsightAPI } from '../../../../api/InsightAPI';
import { InsightResponseStatus } from '../../../../api/Comms';
import { TInsightPost } from '../../../../model/types';
import { ProfileModel } from '../../../../model/ProfileModel';
import {Chart} from 'chart.js'
import { createBarChartOptions } from '../../../../utils/graph-util';
import { keywordsSettings } from '../settings/settings'
import { openEditNoteForNickName } from '../../../../utils/alert-generic';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
	selector: 'insight-details',
	templateUrl: 'user-details.html',
})
export class UserDetailsPage {

	itemPerPage: number = 4;
	currentPage: number = 1;
	 // use pagination instead of top or all
	summaryRanked: object[] = [];
	userDetails: TInsightPost;

	@ViewChild('barChartView') barChartView;
	barChart: any;
	openEditNote: Function = openEditNoteForNickName;

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
			// summary: [{ key, amount, ?story }]
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
						(item.key === category) && (item.story = result.results)
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
		console.log('createInsightGraph', data)
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

		return { data, labels, colors, callback: this.barClicked.bind(this) }
	}

	barClicked(evt) {
		const activeElement = this.barChart.getElementAtEvent(evt)

		if (activeElement[0] && activeElement[0]._index) {
			const activeIndex = activeElement[0]._index
			console.log (activeIndex, 'get story')
			//this.currentInsight = this.insights.filteredData.filter((item: any) => (parseInt(item.groupId) - 1) == activeIndex)[0]
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
