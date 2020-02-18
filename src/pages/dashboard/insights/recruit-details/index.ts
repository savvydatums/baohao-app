import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TRecuritUserDetails } from '../../../../model/types';
import { Chart } from 'chart.js'
import { createBarChartOptions, createPieChartOptions } from '../../../../utils/graph-util';
import { TranslateService } from '@ngx-translate/core';
import { keywordsSettings } from '../settings/settings';

@IonicPage({ name: "RecruitDetailsPage", segment: "RecruitDetailsPage" })
@Component({
  selector: 'recruit-details',
  templateUrl: 'index.html',
})
export class RecruitDetailsPage {

  userData: TRecuritUserDetails;

  // use in interest
  itemPerPage: number = 4;
  currentPage: number = 1;
  
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
    console.log('this.userData', this.userData)
  }

  ionViewDidLoad() {
    this.createInterestGraph();
    this.createCategoryGraph();
  }

  // data: topicChart : 會關注的主題 InterestGraph (pie)
  private createInterestGraph () {
    let AllData = this.generateGraphData (this.userData.topicChart, false)
    this.pieChart = new Chart(this.pieChartView.nativeElement, createPieChartOptions(AllData));
  }

  // categoryChart : 發表文章類型 KeywordGraph (bar) with pagination
  private createCategoryGraph () {
    let AllData = this.generateGraphData (this.userData.categoryChart, true)
    this.barChart = new Chart(this.barChartView.nativeElement, createBarChartOptions(AllData));
  }

  public generateGraphData (dataset, pagination) {
    let data = [];
    let labels = [];
    let colors = [];
    let randomColors = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'];
    let currentLang = this.translate.currentLang || this.translate.defaultLang

    // if (pagination === true) {

    // }

    // generate data
    for (let key in dataset) {
      data.push(dataset[key]);
      const settings = keywordsSettings.allClient[key]
      
      if (settings) {
        labels.push(settings[currentLang] || key) 
        colors.push(settings.color)
      } else {
        labels.push(key) 
        colors.push(randomColors[Math.floor(Math.random() * randomColors.length)])
      }
      
    }

    console.log('generateGraphData', pagination, data, labels, colors ) // some has only one page, some don't

    return { data, labels, colors } 
  }

  closeModal() {
		this.view.dismiss()
	}

}