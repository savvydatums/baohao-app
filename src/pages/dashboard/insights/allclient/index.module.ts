import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllClient } from '.';
import { HttpLoaderFactory } from '../../../../app/app.module';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    declarations: [
        AllClient
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(AllClient),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        AllClient
    ]
})

export class AllClientModule {}