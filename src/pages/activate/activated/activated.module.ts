import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivatedPage } from './activated';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        ActivatedPage
    ],
    imports: [
        IonicPageModule.forChild(ActivatedPage ),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        ActivatedPage
    ]
})

export class ActivatedPageModule {}