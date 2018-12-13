import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivatePage } from './activate';
import { HttpLoaderFactory } from '../../app/app.module';

@NgModule({
    declarations: [
        ActivatePage
    ],
    imports: [
        IonicPageModule.forChild(ActivatePage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents: [
        ActivatePage
    ]
})

export class ActivateModule{}