import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../../../pages/login/login';

@IonicPage()
@Component({
	selector: 'activate',
	templateUrl: './processing.html'
})

export class ProcessingPage {

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public translate: TranslateService,)
	{

	}

	public backToLogin() {
		this.navCtrl.push(LoginPage);
	}
}