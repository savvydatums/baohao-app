import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector : 'activate',
  templateUrl: './payment.html'
})

export class PaymentPage {
	constructor(
		public translate: TranslateService) {
	}

	ionViewDidLoad() {

		var stripScript = document.createElement('script');
		stripScript.setAttribute('src', 'https://checkout.stripe.com/checkout.js');
		stripScript.setAttribute('class', 'stripe-button');
		stripScript.setAttribute('data-description', 'Access for a year');
		stripScript.setAttribute('data-key', 'pk_test_sGSThVPlCiA4xglP9SA7mQyj');
		stripScript.setAttribute('data-amount', '5000');
		stripScript.setAttribute('data-locale', 'auto');
		document.getElementById('strip-form').appendChild(stripScript);
	}
}
