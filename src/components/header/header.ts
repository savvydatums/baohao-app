import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
	selector: 'header',
	templateUrl: 'header.html'
})

export class HeaderComponent {

	@Input()title : string;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController
	) {}

}