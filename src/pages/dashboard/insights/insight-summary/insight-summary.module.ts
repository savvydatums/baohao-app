import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsightSummaryPage } from './insight-summary';
import { ComponentsModule } from '../../../../components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
	declarations: [
		InsightSummaryPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(InsightSummaryPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		InsightSummaryPage
	]
})
export class InsightSummaryPageModule {}
