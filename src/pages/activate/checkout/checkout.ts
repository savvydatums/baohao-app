import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector : 'activate',
  templateUrl: './checkout.html'
})

export class CheckoutPage {
  constructor(public translate: TranslateService) {

  }
}
