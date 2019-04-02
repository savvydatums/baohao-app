import { GroupRegistrationModel } from './../model/GroupRegistrationModel';
import { InsightsModel } from './../model/InsightsModel';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationModel } from './../model/RegistrationModel';
import { LoggedInUserModel } from './../model/LoggedInUserModel';
import { AppointmentModel } from './../model/AppointmentModel';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ComponentsModule } from '../components/components.module';
import { ProfileModel } from '../model/ProfileModel';
import { ArchiveModel } from '../model/ArchiveModel';

@NgModule({
  declarations: [
    MyApp,
	ConfirmComponent,
    LoginPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {preloadModules: true}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
	ConfirmComponent,
    LoginPage,
    StartPage,
    MyApp,
  ],
  providers: [
    RegistrationModel, // this is all services
    GroupRegistrationModel,
    LoggedInUserModel,
    AppointmentModel,
	InsightsModel,
	ArchiveModel,
    ProfileModel,
    StatusBar,
	SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
