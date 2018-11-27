import { Component } from '@angular/core';
import { IonicPage, ModalController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registry',
  templateUrl: './signup.html'
})

export class SignupPage {
  constructor(public modalCtrl: ModalController) {}

  showTermsModel() {
    let termsModel = this.modalCtrl.create(Terms)
    termsModel.present()
  }
}

@Component({
  selector: 'registry',
  templateUrl: './terms.html'
})

export class Terms {
  constructor(public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}