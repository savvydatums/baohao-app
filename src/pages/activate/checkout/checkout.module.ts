import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        CheckoutPage
    ],
    imports: [
        IonicPageModule.forChild(CheckoutPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents: [
        CheckoutPage
    ]
})

export class CheckoutModule {}