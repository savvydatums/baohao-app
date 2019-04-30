import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsModalPage } from './terms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
	declarations: [
		TermsModalPage,
	],
	imports: [
		IonicPageModule.forChild(TermsModalPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		TermsModalPage
	]
})
export class TermsModalModule {}
