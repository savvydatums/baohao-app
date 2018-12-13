import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmRegistrationPage } from './confirm-registration';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        ConfirmRegistrationPage
    ],
    imports: [
        IonicPageModule.forChild(ConfirmRegistrationPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        ConfirmRegistrationPage
    ]
})

export class ConfirmRegistrationModule {}