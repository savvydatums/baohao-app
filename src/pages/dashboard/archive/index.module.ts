import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchivePage } from '.';
import { HttpLoaderFactory } from '../../../app/app.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [
        ArchivePage
    ],
    imports: [
		ComponentsModule,
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