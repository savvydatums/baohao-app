import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Appointment } from './appointment';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        Appointment
    ],
    imports: [
        IonicPageModule.forChild(Appointment),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        Appointment
    ]
})

export class AppointmentModule {}