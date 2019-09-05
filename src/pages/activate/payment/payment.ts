import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ProfileModel } from '../../../model/ProfileModel';

@IonicPage()
@Component({
  selector : 'activate',
  templateUrl: './payment.html'
})

export class PaymentPage {

	constructor(
		public profile: ProfileModel,
		public translate: TranslateService,
		private modalCtrl: ModalController) {
	}

	public openPaymentDetails() {
		const lang = this.translate.currentLang || this.translate.defaultLang
		const paymentDetail = this.modalCtrl.create('PaymentDetailsPage', { lang }, {cssClass: 'payment-modal'});
		paymentDetail.present();
	}
}
