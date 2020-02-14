import { LoginPage } from './../../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({
	segment: 'welcome/:lang'
})
@Component({
  selector: 'registration',
  templateUrl: './welcome.html'
})

export class WelcomePage {
	constructor(
		public translate: TranslateService,
		public navParams: NavParams,
		public navCtrl: NavController) {
	}

	ionViewDidLoad() {
		console.log(this.navParams.get('lang'), window.location.hash)
		const lan = this.navParams.get('lang')

		if (lan == 'en' || lan == 'cn') { this.translate.use(lan); }
	}

  	public gotoLogin () {
		this.navCtrl.push(LoginPage);
	}
}
