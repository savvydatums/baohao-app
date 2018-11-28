import { RegistrationModel } from './../../../model/RegistrationModel';
import { Component } from '@angular/core';
import { IonicPage, ModalController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'registry',
  templateUrl: './signup.html'
})

export class SignupPage {
  constructor(public modalCtrl: ModalController, public registrationModel: RegistrationModel) {}

  showTermsModel() {
    //let termsModel = this.modalCtrl.create(Terms)
    //termsModel.present()
  }

  public register (password:string) {
    
    console.log('password: ',password)
    //this.registrationModel.registrationNum = 
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