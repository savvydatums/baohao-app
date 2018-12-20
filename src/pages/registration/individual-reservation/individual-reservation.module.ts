import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndividualReservationPage } from './individual-reservation';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        IndividualReservationPage
    ],
    imports: [
        IonicPageModule.forChild(IndividualReservationPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        IndividualReservationPage
    ]
})

export class IndividualReservationModule{}