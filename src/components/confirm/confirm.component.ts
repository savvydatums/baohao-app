import { Component } from '@angular/core';
import { AppointmentModel } from '../../model/AppointmentModel';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../../pages/login/login'

@Component({
    selector: 'confirm',
    templateUrl: './confirm.component.html'
})

export class ConfirmComponent {

    ticketNumber: string;
    titleText: boolean;
    bodyText: boolean;
    emailText: boolean;

    constructor(
        public navCtrl: NavController,
        public appointmentModel: AppointmentModel,
        public translate: TranslateService,
        public navParams: NavParams) {
    }

    ngAfterViewInit () {
        this.titleText = this.navParams.get('titleText');
        this.ticketNumber = this.navParams.get('ticketNumber');
        this.emailText = this.navParams.get('emailText');
        this.bodyText = this.navParams.get('bodyText');
        //this.resendEmail = this.navParams.get('resendCallback');
    }

    public redirectToApp() {
        this.navCtrl.push(LoginPage);
    }

}