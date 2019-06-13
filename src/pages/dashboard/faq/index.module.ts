import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqPage } from '.';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
	declarations: [
		FaqPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(FaqPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		FaqPage
	]
})
export class FaqPageModule {}
