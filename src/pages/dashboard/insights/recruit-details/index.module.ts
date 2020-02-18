import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecruitDetailsPage } from '.';
import { ComponentsModule } from '../../../../components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    RecruitDetailsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RecruitDetailsPage),
    TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
  ],
  entryComponents: [
    RecruitDetailsPage
	]
})
export class RecruitDetailsPageModule {}
