import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailsPage } from './user-details';
import { ComponentsModule } from '../../../../components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
	declarations: [
		UserDetailsPage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(UserDetailsPage),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		})
	],
	entryComponents: [
		UserDetailsPage
	]
})
export class UserDetailsPageModule {}
