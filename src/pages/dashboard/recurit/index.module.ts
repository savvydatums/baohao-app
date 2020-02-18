import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { IonicPageModule } from 'ionic-angular';
import { RecuritPage } from '.';
import { HttpLoaderFactory } from '../../../app/app.module';

@NgModule({
	declarations: [
		RecuritPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(RecuritPage),
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
        RecuritPage
    ]
})
export class RecuritPageModule {}
