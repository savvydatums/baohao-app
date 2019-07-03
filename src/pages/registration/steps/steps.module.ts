import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepsPage } from './steps';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [StepsPage],
    imports: [
        IonicPageModule.forChild(StepsPage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents: [StepsPage]
})

export class StepsModule{}