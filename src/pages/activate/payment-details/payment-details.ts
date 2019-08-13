import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { platforms } from '../../../app/app.module';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'payment-details',
  templateUrl: 'payment-details.html',
})

export class PaymentDetailsPage {

	productID:string = 'com.baohao.myinsurbox.yearlyservice';
	shouldShowInAppPurchase: boolean = false;

	constructor(
		public profile: ProfileModel, 
		public navParams: NavParams,
		public viewCtrl : ViewController,
		private iap: InAppPurchase,
		public alertCtrl: AlertController
		) {
	}

	ionViewWillEnter() {
		this.shouldShowInAppPurchase = cordova.platformId === platforms.Ios
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

	public IAPbuy() {
		let self = this
		this.iap.buy(this.productID)
			.then((data)=> {
				self.showConfirm('finish purchase', JSON.stringify(data))
			})
			.catch((err)=> {
				console.log(err);
				self.showConfirm('error', JSON.stringify(err))
			});
	}

	public showConfirm (title, message) {
		const alert = this.alertCtrl.create({
			title: title,
			message: message,
			buttons: [{　text: 'ok'　}]
		})

		alert.present()
	}

}
