import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchivePage } from '.';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        ArchivePage
    ],
    imports: [
        IonicPageModule.forChild(ArchivePage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        ArchivePage
    ]
})

export class ArchivePageModule {}