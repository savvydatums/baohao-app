import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InsightsModel } from '../../../../model/InsightsModel';
import { Chart } from 'chart.js'
import { TranslateService } from '@ngx-translate/core';

@IonicPage({ name: "insightSummary", segment: "insightSummary"})
@Component({
  selector: 'page-insight-summary',
  templateUrl: 'insight-summary.html',
})
export class InsightSummaryPage {

	@ViewChild('barChartView') barChartView;
	barChart: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public insights: InsightsModel,
		public translate: TranslateService,
		private view: ViewController) {
	}

	ionViewDidLoad() {

		this.barChart = new Chart(this.barChartView.nativeElement, {
			type: 'bar',
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					]
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}

	getInsightsDataInArrays () {

		let data = [];
		let labels = [];
		//let colors = [];

		this.insights.summaryInArray.map ((item:any) => {
			data.push(item.amount);
			const label = this.translate.translations.INSIGHT.GROUP[item.key]
			labels.push(label)
		})

		return { data, labels }
	}

	closeModal() {
		this.view.dismiss()
	}

}
