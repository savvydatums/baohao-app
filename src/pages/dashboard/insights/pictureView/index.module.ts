import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictureView } from '.';
import { HttpLoaderFactory } from '../../../../app/app.module';

@NgModule({
    declarations: [
        PictureView
    ],
    imports: [
        IonicPageModule.forChild(PictureView),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        PictureView
    ]
})

export class PictureViewModule {}