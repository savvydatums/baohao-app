import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordPage } from '.';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ForgetPasswordPage,
	],
	imports: [
		IonicPageModule.forChild(ForgetPasswordPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		ForgetPasswordPage
	]
})
export class ForgetPasswordPageModule {}
