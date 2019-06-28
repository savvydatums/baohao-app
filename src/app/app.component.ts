import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StartPage } from '../pages/start/start'
import { TranslateService } from '@ngx-translate/core';
import { ProfileModel } from '../model/ProfileModel';
import { UserAPI } from '../api/UserAPI';
import { LoginPage } from '../pages/login/login';
import { FaqPage } from '../pages/dashboard/faq';
import { SupportPage } from '../pages/dashboard/support';
import { TrashPage } from '../pages/dashboard/trash';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
	rootPage: any = StartPage;
	@ViewChild(Nav) nav: Nav;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		public translate: TranslateService,
		public profile: ProfileModel
	) {

		translate.setDefaultLang('cn');
		profile.language = 'cn';

		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}

	public logout() {
		if (this.profile.cookie) {
			UserAPI.logout(this.profile.cookie)
				.then((result: any) => {
					if (result.status == 'ok') {
						this.nav.push (LoginPage)
					}
					console.log (result);
				}, (error: any) => {
					console.log (error);
				});
		}
	}

	public goToFAQ() {
		this.nav.push(FaqPage)
	}

	public goToSupport() {
		this.nav.push(SupportPage)
	}

	public goToTrash() {
		this.nav.push(TrashPage)
	}

}
