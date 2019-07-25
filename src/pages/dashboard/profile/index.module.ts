import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from '.';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(ProfilePage),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
              }
        })
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents : [
        ProfilePage
    ]
})

export class ProfilePageModule {}