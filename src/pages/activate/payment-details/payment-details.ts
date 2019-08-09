import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';

@IonicPage()
@Component({
  selector: 'payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {

	SlideOpts: object = {
		initialSlide: 1,
		speed: 400
	  };

	constructor(
		public profile: ProfileModel, 
		public navParams: NavParams,
		public viewCtrl : ViewController, 
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
