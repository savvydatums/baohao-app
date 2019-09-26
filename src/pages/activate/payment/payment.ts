import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ProfileModel } from '../../../model/ProfileModel';
//import { platforms } from '../../../app/app.module';
// import { InAppPurchase } from '@ionic-native/in-app-purchase';
// import { Appointment } from '../appointment/appointment';
// import { RegistrationAPI } from '../../../api/RegistrationAPI';
// import { ResponseStatus } from '../../../api/Comms';

//declare var cordova: any;

@IonicPage()
@Component({
  selector : 'activate',
  templateUrl: './payment.html'
})

export class PaymentPage {

	//productID: string = 'com.baohao.myinsurbox.yearlyservice';
	//shouldShowIOSInfo: boolean = false;
	//iAPProcessing = false;
	//isInApp: boolean = false;

	price: string = '';
	smallText: string = '';

	constructor(
		public profile: ProfileModel,
		public translate: TranslateService,
		// private iap: InAppPurchase,
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		private modalCtrl: ModalController) {
	}

	ionViewWillEnter() {
		// const isRegistry= location.href.indexOf('registry') >= 0
		// isRegistry && (this.isInApp = true)
	//this.shouldShowIOSInfo = cordova.platformId === platforms.Ios
	// 	this.price = this.shouldShowIOSInfo ? 'loading' : this.translate.instant('PAYMENT.PRICE') 

	// 	const smallTextKey = this.shouldShowIOSInfo ? 'PAYMENT.IOS.SMALL_TEXT' : 'PAYMENT.SMALL_TEXT'
	// 	this.smallText = this.translate.instant(smallTextKey)

	// 	if (this.shouldShowIOSInfo) {
	// 		this.iap
	// 		.getProducts([this.productID])
	// 		.then((productData) => {
	// 			const data = productData[0]
	// 			console.log(JSON.stringify(data))
	// 			this.price = data.currency + ' '+ data.price
	// 			this.productID = productData[0].productId
	// 		})
	// 		.catch((err) => {
	// 			this.iAPProcessing = false
	// 			this.showConfirm(false)
	// 			console.log('purchase error', JSON.stringify(err))
	// 		});
	// 	}
	}

	// public IAPbuy() {
	// 	let self = this
	// 	this.iAPProcessing = true

	// 	this.iap
	// 		.buy(this.productID)
	// 		.then((data)=> {
	// 			self.saveReceipt(data)
	// 		})
	// 		.catch((err)=> {
	// 			this.iAPProcessing = false
	// 			self.showConfirm(false)
	// 			console.log('purchase error', JSON.stringify(err))
	// 		});
	// }

	// public showConfirm (isSuccess) {
	// 	const errorTitle = this.translate.instant('PAYMENT.DETAILS.IAP_ERROR')
	// 	const errorInfo = this.translate.instant('PAYMENT.DETAILS.IAP_ERROR_INFO')
	// 	const successTitle = this.translate.instant('PAYMENT.DETAILS.IAP_SUCCESS')
	// 	const successInfo = this.translate.instant('PAYMENT.DETAILS.IAP_SUCCESS_INFO')

	// 	// title, message, 
	// 	const alert = this.alertCtrl.create({
	// 		title: isSuccess ? successTitle : errorTitle,
	// 		message: isSuccess ? successInfo : errorInfo,
	// 		buttons: [
	// 		{　text: 'ok',
	// 			handler: () => {
	// 				if (isSuccess == true) {
	// 					this.navCtrl.push(Appointment, { cookie: this.profile.cookie })
	// 				}
	// 			}
	// 	　	}]
	// 	})

	// 	alert.present()
	// }

	// public saveReceipt (data) {
	// 	let self = this
		
	// 	RegistrationAPI.inAppPurchase(this.profile.cookie, data.transactionId, data.receipt)
	// 		.then((result: any)=> {
	// 			if (result.code !== ResponseStatus.SUCCESS) {
	// 				console.log('error', result)
	// 			}
	// 			self.showConfirm(true)
	// 			this.iAPProcessing = false
	// 		},(error:any) => {
	// 			this.iAPProcessing = false
	// 			console.log('error', error)
	// 		});
	// }


	public openPaymentDetails() {
		const lang = this.translate.currentLang || this.translate.defaultLang
		const paymentDetail = this.modalCtrl.create('PaymentDetailsPage', { lang }, {cssClass: 'payment-modal'});
		paymentDetail.present();
	}
}
