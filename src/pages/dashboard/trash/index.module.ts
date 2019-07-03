import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { TrashPage } from '.';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
	declarations: [
		TrashPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(TrashPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		TrashPage
	]
})
export class TrashPageModule {}
