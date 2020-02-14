import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app/app.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPage } from '.';

@NgModule({
	declarations: [
		InfoPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(InfoPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents : [
        InfoPage
    ]
})
export class InfoPageModule {}
