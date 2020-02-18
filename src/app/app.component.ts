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
import { ProfilePage } from '../pages/dashboard/profile/index';
import { ArchivePage } from '../pages/dashboard/archive';
import { InfoPage } from '../pages/dashboard/info';

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
			//let orientation:any = window.screen.orientation;
			//orientation.lock('portrait');

		});
	}

	public logout() {
		if (this.profile.cookie) {
			UserAPI.logout(this.profile.cookie)
				.then((result: any) => {
					if (result.status == 'ok') {
						this.nav.push (LoginPage)
					}
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
	
	public goToArchive() {
		this.nav.push(ArchivePage)
	}

	public goToTrash() {
		this.nav.push(TrashPage)
	}

	public goToProfile() {
		this.nav.push(ProfilePage)
	}
	
	public goToInfo() {
		this.nav.push(InfoPage)
	}
}