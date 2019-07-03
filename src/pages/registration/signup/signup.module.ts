import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        SignupPage
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        SignupPage
    ]
})

export class SignupModule{}