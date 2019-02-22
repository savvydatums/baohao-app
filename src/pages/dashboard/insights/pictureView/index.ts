import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HeaderComponent, THEME } from '../../../../components/header/header'
import { SearchBarComponent } from '../../../../components/search-bar/search-bar';
import { TranslateService } from '@ngx-translate/core';
import { InsightsModel } from '../../../../model/InsightsModel';

@IonicPage({ name: "pictureView", segment: "pictureView" })
@Component({
  selector: 'pictureView',
  templateUrl: 'index.html'
})

// https://ionicframework.com/docs/api/slides -> change style and action based on this
// http://idangero.us/swiper/demos/ --> get it from here
export class PictureView {

  categoriesCount: object;
  searchValue: string;
  categoryColors: object;

  @ViewChild(forwardRef(() => HeaderComponent)) header
  @ViewChild(forwardRef(() => SearchBarComponent)) searchBar

  constructor(
    public navCtrl: NavController,
    public insights: InsightsModel,
    public translate: TranslateService) {
  }

  ionViewDidLoad() {
    this.insights.setShownContent();
    this.header.setTheme(THEME.PICTURE);
    this.categoriesCount = this.insights.getCategoriesCount();
  }

  public renderTimeStamp(timestamp: number) {
    const time = parseInt(timestamp + '000')
    return new Date(time).toDateString()
  }

}
