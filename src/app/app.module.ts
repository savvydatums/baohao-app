import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationModel } from './../model/RegistrationModel';
import { LoggedInUserModel } from './../model/LoggedInUserModel';
import { AppointmentModel } from './../model/AppointmentModel';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,

    LoginPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {preloadModules: true}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    StartPage,

    MyApp,
    ContactPage,
    TabsPage
  ],
  providers: [
    RegistrationModel,
    LoggedInUserModel,
    AppointmentModel,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
