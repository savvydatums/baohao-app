import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        PaymentPage
    ],
    imports: [
        IonicPageModule.forChild(PaymentPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents: [
        PaymentPage
    ]
})

export class PaymentModule{}