import { ResetPasswordPage } from '.';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        ResetPasswordPage
    ],
    imports: [
        IonicPageModule.forChild(ResetPasswordPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        ResetPasswordPage
    ]
})

export class ResetPasswordModule{}