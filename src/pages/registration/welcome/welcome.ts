import { LoginPage } from './../../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './welcome.html'
})

export class WelcomePage {
	constructor(
		public translate: TranslateService,
		public navCtrl: NavController) {
	}

  	public gotoLogin () {
		this.navCtrl.push(LoginPage);
	}
}
