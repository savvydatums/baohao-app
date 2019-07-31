import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TInsightPost } from '../../../../model/types';
import { InsightAPI } from '../../../../api/InsightAPI';
import { AdvertModel } from '../../../../model/AdvertModel';
import { ProfileModel } from '../../../../model/ProfileModel';
import { ResponseStatus } from '../../../../api/Comms';
import { renderTimeStampInNumber } from '../../../../utils/insight-util';

@IonicPage({ name: "advert-details", segment: "advert-details" })
@Component({
  selector: 'advert-details',
  templateUrl: 'index.html',
})
export class AdvertDetailsPage {

  insightData: TInsightPost;
  renderTimeStamp: Function = renderTimeStampInNumber;

  constructor (
    private view: ViewController,
    public navCtrl: NavController,
    public advert: AdvertModel,
    public profile: ProfileModel, 
    public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.insightData = this.navParams.get('info')
  }

  ionViewDidLoad() {
    this.calculateModalHeight()
  }

  private calculateModalHeight() {
    const contentRef = this.view.contentRef()
    const innerContent =  contentRef.nativeElement.getElementsByClassName('content')[0]
    const content =  contentRef.nativeElement
    const totalPaddingY = 30;
    const height = innerContent.offsetHeight + totalPaddingY
    const maxHeight = content.offsetHeight - 48
    content.style.height = ((maxHeight <= height) ? maxHeight : height) + 'px';
  }

  public updateSuggestionUseful (isUseful) {
		const useful = (this.insightData.useful == isUseful) ? 'null' : isUseful

		InsightAPI.updateInsightUseful(
			this.profile.cookie, this.insightData.source, this.insightData._id, useful.toString())
			.then((result: any) => {
				const isFail = (result.status == ResponseStatus.ERROR)
				!isFail && this.advert.updateUsefulData(this.insightData.source, this.insightData._id, useful)
			}, error => {
				console.log(error)
			})
  }
  public closeModal() {
    this.view.dismiss()
  }

}
