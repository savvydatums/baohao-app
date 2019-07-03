import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/index';

@Component({
	selector: 'header',
	templateUrl: 'header.html'
})

export class HeaderComponent {

	@Input()title : string;
	@Input()toDashboard: boolean = false;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController
	) {}

	public goToDashboard() {
		this.navCtrl.push(DashboardPage);
	}

}