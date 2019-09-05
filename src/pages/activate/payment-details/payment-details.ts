import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'payment-details',
  templateUrl: 'payment-details.html',
})

export class PaymentDetailsPage {

	constructor(
		public profile: ProfileModel, 
		public navCtrl: NavController,
		public viewCtrl : ViewController,
		public translate: TranslateService,
		public alertCtrl: AlertController
		) {
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

		var cookieInput = document.getElementById("cookie")
		cookieInput.setAttribute('value', this.profile.cookie);
	}

	public closeModal(){
		this.viewCtrl.dismiss();
	}
}
