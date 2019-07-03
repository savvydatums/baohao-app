import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PotentialPage } from './index';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../app/app.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
	declarations: [
		PotentialPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(PotentialPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		PotentialPage
	]
})
export class PotentialPageModule {}
