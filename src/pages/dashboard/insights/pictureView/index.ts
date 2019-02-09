import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HeaderComponent, THEME } from '../../../../components/header/header'

@IonicPage({ name: "pictureView", segment: "pictureView" })
@Component({
  selector: 'pictureView',
  templateUrl: 'index.html'
})

export class PictureView {

  @ViewChild(forwardRef(() => HeaderComponent))
  private header: HeaderComponent;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.header.setTheme(THEME.PICTURE);
  }

}
