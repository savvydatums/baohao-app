import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AllInsightsModel } from '../../../../model/AllInsightsModel'
import { Chart } from 'chart.js'
import { TranslateService } from '@ngx-translate/core'
import { ProfileModel } from '../../../../model/ProfileModel';
import { getGroupTitleByKey } from '../../../../utils/Data-Fetch';

@IonicPage()
@Component({
	selector: 'insight-summary',
	templateUrl: 'insight-summary.html',
})
export class InsightSummaryPage {

	@ViewChild('barChartView') barChartView;
	barChart: any;
	currentInsight: object; // use in display page
	insightData: any; // use in the chart

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public insights: AllInsightsModel,
		public translate: TranslateService,
		public profile: ProfileModel,
		private view: ViewController) {
	}

	ionViewWillEnter() {
		this.currentInsight = this.insights.summaryInArray[0]
	}

	ionViewDidLoad() {
		console.log(this.currentInsight)
		this.insightData = this.getInsightsDataInArrays();

		this.barChart = new Chart(this.barChartView.nativeElement, {
			type: 'bar',
			data: {
				labels: this.insightData.labels,
				datasets: [{
					data: this.insightData.data,
					backgroundColor: [
						'rgb(255, 99, 132)',
						'rgb(54, 162, 235)',
						'rgb(255, 206, 86)',
						'rgb(75, 192, 192)',
						'rgb(153, 102, 255)',
						'rgb(255, 159, 64)'
					]
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							fontColor: '#fff'
						},
						gridLines: {
							display: false
						},
						barPercentage: 0.7
					}],
					xAxes: [{
						gridLines: {
							display: false
						},
						ticks :{
							fontColor: '#fff'
						}
					}]
				},
				gridLines: {
					offsetGridLines: false
				},
				maintainAspectRatio: false,
				onClick: this.barClicked.bind(this),
				legend: { display: false }
			}
		});
	}

	getInsightsDataInArrays () {

		let data = [];
		let labels = [];

		this.insights.summaryInArray.map ((item:any) => {
			data.push(item.amount);
			const label = getGroupTitleByKey(this.translate, item.key)
			labels.push(label)
		})

		return { data, labels }
	}

	closeModal() {
		this.view.dismiss()
	}

	barClicked(evt) {
		const activeElement = this.barChart.getElementAtEvent(evt)

		if (activeElement[0] && activeElement[0]._index) {
			const activeIndex = activeElement[0]._index
			this.currentInsight = this.insights.summaryInArray.filter((item:any) => (parseInt(item.groupId) -1) == activeIndex)[0]
		}
	}

	getGroupTitle (key) {
		return getGroupTitleByKey(this.translate, key)
	}
}
