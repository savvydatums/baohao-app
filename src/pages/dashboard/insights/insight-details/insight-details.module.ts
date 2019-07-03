import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsightDetailsPage } from './insight-details';
import {ComponentsModule} from '../../../../components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
	declarations: [
		InsightDetailsPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(InsightDetailsPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		InsightDetailsPage
	]
})
export class InsightDetailsPageModule {}