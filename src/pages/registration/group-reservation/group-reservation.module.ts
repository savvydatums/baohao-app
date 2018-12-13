import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {GroupReservation} from './group-reservation';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        GroupReservation
    ],
    imports: [
        IonicPageModule.forChild(GroupReservation),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        GroupReservation
    ]
})

export class GroupReservationModule {}