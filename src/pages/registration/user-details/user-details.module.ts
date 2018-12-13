import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailsPage } from './user-details';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        UserDetailsPage
    ],
    imports: [
        IonicPageModule.forChild(UserDetailsPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        UserDetailsPage
    ]
})

export class UserDetailsModule{}