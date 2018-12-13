import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupReserved } from './group-reserved';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        GroupReserved
    ],
    imports: [
        IonicPageModule.forChild(GroupReserved ),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    entryComponents : [
        GroupReserved
    ]
})

export class GroupReservedModule {}