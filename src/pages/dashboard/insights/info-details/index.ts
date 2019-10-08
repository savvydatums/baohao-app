import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage({ name: "InfoDetailsPage", segment: "InfoDetailsPage"})
@Component({
	selector: 'info-details',
	templateUrl: 'index.html',
})
export class InfoDetailsPage {

	defaultBgUrl: string = '/assets/imgs/default_logo_bg.jpg';
	postData: any = {};

	constructor(
		private view: ViewController,
		public navCtrl: NavController, 
		public navParams: NavParams) {
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
