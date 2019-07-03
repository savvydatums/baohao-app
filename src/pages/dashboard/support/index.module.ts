import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportPage } from '.';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app/app.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
	declarations: [
		SupportPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(SupportPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		SupportPage
	]
})
export class SupportPageModule {}
