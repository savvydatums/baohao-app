import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../app/app.module';
import { AdvertPage } from '.';

@NgModule({
  declarations: [
    AdvertPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AdvertPage),
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
        }
    })
  ],
  entryComponents : [
    AdvertPage
  ]
})
export class AdvertPageModule {}
