import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';
import { isDebug } from '../../utils/url-util';
import { ProfileModel } from '../../model/ProfileModel';

@Component({
	selector: 'start',
	templateUrl: 'start.html'
})
export class StartPage {

	constructor(
		public navCtrl: NavController, 
		public translate: TranslateService,
		public profile: ProfileModel
		) {
	}

	ngAfterViewInit() {
		isDebug() && setTimeout(() => this.gotoLogin(), 1000);
	}

	public setLanguage(lan:string):void {
		this.translate.use(lan);
		this.profile.language = lan
	}

	public gotoLogin () {
		this.navCtrl.push(LoginPage);
	}
}
