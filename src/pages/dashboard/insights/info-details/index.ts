import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({ name: "InfoDetailsPage", segment: "InfoDetailsPage"})
@Component({
	selector: 'info-details',
	templateUrl: 'index.html',
})
export class InfoDetailsPage {

	defaultBgUrl: string = '/assets/imgs/default_logo_bg.jpg';
	postData: any = {};
	lang : string ;

	constructor(
		private view: ViewController,
		public navCtrl: NavController,
		public translate: TranslateService, 
		public navParams: NavParams) {

		this.lang =  translate.currentLang || translate.defaultLang
	}

	ionViewWillLoad() {
		this.postData = this.navParams.get('postData')
	}

	getPath (imgPath) {
		return (imgPath && imgPath.length > 0) ? imgPath : this.defaultBgUrl
	}

	closeModal () {
		this.view.dismiss()
	}

}
