import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector : 'activate',
  templateUrl: './payment.html'
})

export class PaymentPage {
  constructor(public translate: TranslateService) {

  }
}
