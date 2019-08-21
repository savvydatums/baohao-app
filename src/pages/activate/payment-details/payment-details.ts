import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { platforms } from '../../../app/app.module';
import { TranslateService } from '@ngx-translate/core';
import { Appointment } from '../appointment/appointment';
import { RegistrationAPI } from '../../../api/RegistrationAPI';
import { ResponseStatus } from '../../../api/Comms';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'payment-details',
  templateUrl: 'payment-details.html',
})

export class PaymentDetailsPage {

	productID:string = 'com.baohao.myinsurbox.yearlyservice';
	shouldShowInAppPurchase: boolean = false;
	iAPProcessing = false

	constructor(
		public profile: ProfileModel, 
		public navCtrl: NavController,
		public viewCtrl : ViewController,
		private iap: InAppPurchase,
		public translate: TranslateService,
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
		this.iAPProcessing = true
		const errorTitle = this.translate.instant('PAYMENT.DETAILS.IAP_ERROR')
		const errorInfo = this.translate.instant('PAYMENT.DETAILS.IAP_ERROR_INFO')

		this.iap
			.getProducts([this.productID]) // need to request product first always
			.then((productData) => {
				this.iap
				.buy(productData[0].productId)
				.then((data)=> {
					self.saveReceipt(data)
				})
				.catch((err)=> {
					this.iAPProcessing = false
					self.showConfirm(errorTitle, errorInfo, false)
					console.log('purchase error', JSON.stringify(err))
				});
			})
			.catch((err) => {
				this.iAPProcessing = false
				self.showConfirm(errorTitle, errorInfo, false)
				console.log('purchase error', JSON.stringify(err))
			});
	}

	public showConfirm (title, message, isSuccess) {
		const alert = this.alertCtrl.create({
			title: title,
			message: message,
			buttons: [
			{　text: 'ok',
				handler: () => {
					if (isSuccess == true) {
						this.navCtrl.push(Appointment, { cookie: this.profile.cookie })
					}
					this.closeModal();
				}
		　	}]
		})

		alert.present()
	}

	public saveReceipt (data) {
		let self = this
		const successTitle = this.translate.instant('PAYMENT.DETAILS.IAP_SUCCESS')
		const successInfo = this.translate.instant('PAYMENT.DETAILS.IAP_SUCCESS_INFO')
		console.log(data.transactionId, data.receipt)

		RegistrationAPI.inAppPurchase(this.profile.cookie, data.transactionId, data.receipt)
			.then((result: any)=> {
				if (result.code !== ResponseStatus.SUCCESS) {
					console.log('error', result)
				}
				self.showConfirm(successTitle, successInfo, true)
				this.iAPProcessing = false
			},(error:any) => {
				this.iAPProcessing = false
				console.log('error', error)
			});
	}
}
