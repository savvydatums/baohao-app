import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationModel } from './../model/RegistrationModel';
import { LoggedInUserModel } from './../model/LoggedInUserModel';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,

    LoginPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {preloadModules: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    StartPage,

    MyApp,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    RegistrationModel,
    LoggedInUserModel,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
