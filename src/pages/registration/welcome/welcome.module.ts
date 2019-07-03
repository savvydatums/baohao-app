import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [WelcomePage],
    imports: [
        IonicPageModule.forChild(WelcomePage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents: [WelcomePage]
})

export class WelcomeModule{}