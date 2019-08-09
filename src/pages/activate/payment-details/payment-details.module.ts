import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentDetailsPage } from './payment-details';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
  declarations: [
    PaymentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentDetailsPage),
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
        }
  })
  ],
  entryComponents: [
    PaymentDetailsPage
  ]
})
export class PaymentDetailsPageModule {}
