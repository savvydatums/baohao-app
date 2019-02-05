import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { DashboardPage } from '../dashboard/index/index'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController, public translate: TranslateService) {
  }


  ngAfterViewInit() {
    //setTimeout(() => this.navCtrl.push(DashboardPage), 2000); // this is only for testing
  }

  public setLanguage(lan:string):void {
    this.translate.use(lan);
  }

  public gotoLogin () {
    this.navCtrl.push(LoginPage);
  }
}
