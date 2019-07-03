import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './index';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        DashboardPage,
    ],
    imports: [
        IonicPageModule.forChild(DashboardPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        DashboardPage
    ]
})

export class DashboardPageModule {}