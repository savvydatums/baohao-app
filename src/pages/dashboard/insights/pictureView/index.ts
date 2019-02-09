import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HeaderComponent, THEME } from '../../../../components/header/header'

@IonicPage({ name: "pictureView", segment: "pictureView" })
@Component({
  selector: 'pictureView',
  templateUrl: 'index.html'
})

// https://ionicframework.com/docs/api/slides -> change style and action based on this
// http://idangero.us/swiper/demos/ --> get it from here
export class PictureView {

  @ViewChild(forwardRef(() => HeaderComponent))
  private header: HeaderComponent;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.header.setTheme(THEME.PICTURE);
  }

}
