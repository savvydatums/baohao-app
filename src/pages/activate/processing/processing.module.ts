import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcessingPage } from './processing';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        ProcessingPage
    ],
    imports: [
        IonicPageModule.forChild(ProcessingPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        ProcessingPage
    ]
})

export class ProcessingModule {}