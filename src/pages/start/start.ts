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

	ionViewDidLoad() {
		isDebug() && setTimeout(() => this.gotoLogin(), 1000);
		this.swapeProloadImage()
	}

	swapeProloadImage () {
		const video : HTMLElement|any = document.getElementById("intro-video");
		const preloadImg = document.getElementById("preload-image");
		video.onloadeddata = function() {
			video.classList.remove('dismiss')
			video.muted = true; 
			video.play()
			preloadImg.classList.add('dismiss')
		}
	}

	public setLanguage(lan:string):void {
		this.translate.use(lan);
		this.profile.language = lan
	}

	public gotoLogin () {
		this.navCtrl.push(LoginPage);
	}
}
