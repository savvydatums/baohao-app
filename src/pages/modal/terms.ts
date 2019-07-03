import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'terms',
  templateUrl: 'terms.html',
})
export class TermsModalPage {

	@ViewChild('ch') chRef: ElementRef;
	@ViewChild('en') enRef: ElementRef;

	constructor(public viewCtrl : ViewController, public navParams: NavParams) {

	}

	public closeModal(){
		this.viewCtrl.dismiss();
	}

	ionViewDidLoad() {
		if (this.navParams.get('lang') == 'en') {
			this.chRef.nativeElement.style.display = 'none';
			this.enRef.nativeElement.style.display = 'block';
		} else {
			this.enRef.nativeElement.style.display = 'none';
			this.chRef.nativeElement.style.display = 'block';
		}
	}

}
