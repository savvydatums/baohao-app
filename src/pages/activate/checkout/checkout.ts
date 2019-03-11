import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

const url = 'https://baoheuat.eastasia.cloudapp.azure.com/wordpress/index.php/asp-products/myinsurbox/'

@IonicPage()
@Component({
  selector : 'activate',
  templateUrl: './checkout.html'
})
export class CheckoutPage {

	protected url:string;

	constructor (public translate: TranslateService) {
		this.url = url
	}

	ionViewDidLoad() {

	}
}
