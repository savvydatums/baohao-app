import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ProfileModel } from '../../../model/ProfileModel';
import { platforms } from '../../../app/app.module';

declare var cordova: any;

@IonicPage()
@Component({
  selector : 'activate',
  templateUrl: './payment.html'
})

export class PaymentPage {

	shouldShowIOSInfo: boolean = false;

	constructor(
		public profile: ProfileModel,
		public translate: TranslateService,
		private modalCtrl: ModalController) {
	}

	ionViewWillEnter() {
		this.shouldShowIOSInfo = cordova.platformId === platforms.Ios
	}

	public openPaymentDetails() {
		const lang = this.translate.currentLang || this.translate.defaultLang
		const paymentDetail = this.modalCtrl.create('PaymentDetailsPage', { lang }, {cssClass: 'payment-modal'});
		paymentDetail.present();
	}
}
