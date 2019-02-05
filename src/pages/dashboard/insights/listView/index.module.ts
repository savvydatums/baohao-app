import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListView } from '.';
import { HttpLoaderFactory } from '../../../../app/app.module';

@NgModule({
    declarations: [
        ListView
    ],
    imports: [
        IonicPageModule.forChild(ListView),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        ListView
    ]
})

export class ListViewModule {}