import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TRecuritUserDetails } from '../../../../model/types';
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { createInterestChartOptions, createCategoryChartOptions } from '../../../../utils/graph-util';
import { TranslateService } from '@ngx-translate/core';
import { keywordsSettings } from '../settings/settings';

Chart.plugins.unregister(ChartDataLabels); // unregistered globally, only use in specific chart

@IonicPage({ name: "RecruitDetailsPage", segment: "RecruitDetailsPage" })
@Component({
  selector: 'recruit-details',
  templateUrl: 'index.html',
})
export class RecruitDetailsPage {

  userData: TRecuritUserDetails;

  // use only in category chart
  itemPerPage: number = 4;
  currentPage: number = 1;
  rankedCategoryData: any[] = [];
  
  @ViewChild('barChartView') barChartView;
  @ViewChild('pieChartView') pieChartView;
  barChart: any;
  pieChart: any;

  constructor(
      public navCtrl: NavController,
      private view: ViewController,
      public translate: TranslateService,
      public navParams: NavParams
    ) {
  }

  ionViewWillLoad() {
    this.userData = this.navParams.get('info')
  }

  ionViewDidLoad() {
    this.createInterestGraph();
    this.createCategoryGraph();
  }

  // data: topicChart : 會關注的主題 InterestGraph (pie)
  private createInterestGraph () {
    let AllData = this.generateGraphData (this.userData.topicChart, false)
    this.pieChart = new Chart(this.pieChartView.nativeElement, createInterestChartOptions(AllData) as any);
  }

  // categoryChart : 發表文章類型 KeywordGraph (bar) with pagination
  private createCategoryGraph () {
    this.generateGraphData (this.userData.categoryChart, true)
    let paginationData = this.generatePaginationDataForCategory ()
    this.barChart = new Chart(this.barChartView.nativeElement, createCategoryChartOptions(paginationData));
  }

  public generateGraphData (dataset, pagination) {
    let ranked = [];
    let currentLang = this.translate.currentLang || this.translate.defaultLang

    // TODO: fix the pagination, pie chart label color, and loading    

    for (let key in dataset) {
      const settings = keywordsSettings.allClient[key] || keywordsSettings.interest[key]
      ranked.push({
        key,
        amount: dataset[key],
        settings
      })
    }

    ranked.sort ((a, b) => (b.amount - a.amount))

    if (pagination === true) {
      this.rankedCategoryData = ranked;

    } else {
      let data = [];
      let labels = [];
      let colors = [];

      ranked.map (item => {
        data.push(item.amount)
        labels.push(item.settings[currentLang])
        colors.push(item.settings.color)
      })

      return  { data, labels, colors }
    }
  }
  
  generatePaginationDataForCategory () {
    const max = this.itemPerPage * this.currentPage;
    const min = (this.itemPerPage * (this.currentPage - 1));
    let currentLang = this.translate.currentLang || this.translate.defaultLang

    let data = [];
    let labels = [];
    let colors = [];

    this.rankedCategoryData.map ((item:any, key) =>{
      const withinRange = key < max && key >= min
			if (withinRange && item.settings) {
				data.push(item.amount);
				labels.push(item.settings[currentLang]);
				colors.push(item.settings.color)
			}
    })

    return { data, labels, colors }
  }

  changePage(addNumber:number) {
		this.currentPage += addNumber;
		const newPageData = this.generatePaginationDataForCategory();
		this.barChart.data.labels = newPageData.labels
		this.barChart.data.datasets[0].data = newPageData.data
		this.barChart.data.datasets[0].backgroundColor = newPageData.colors
		this.barChart.update();
	}

  closeModal() {
		this.view.dismiss()
	}

}