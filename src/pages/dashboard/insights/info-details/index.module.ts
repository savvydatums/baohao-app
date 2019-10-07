import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../../../components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../app/app.module';
import { HttpClient } from '@angular/common/http';
import { IonicPageModule } from 'ionic-angular';
import { InfoDetailsPage } from '.';

@NgModule({
	declarations: [
		InfoDetailsPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(InfoDetailsPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		InfoDetailsPage
	]
})
export class InfoDetailsPageModule {}
