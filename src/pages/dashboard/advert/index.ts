import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { insightFilterTypes, filterOptions } from '../insights/settings/settings';
import { HeaderComponent } from '../../../components/header/header';
import { SearchBarComponent } from '../../../components/search-bar/search-bar';
import { ProfileModel } from '../../../model/ProfileModel';
import { showError } from '../../../utils/alert-generic';
import { AdvertModel } from '../../../model/AdvertModel';
import { InsightResponseStatus } from '../../../api/Comms';
import { TranslateService } from '@ngx-translate/core';
import { getKeywordText, getKeywordInfo, renderTimeStamp, starItem, trashItem, assignAdvertToModal } from '../../../utils/insight-util';
import { ArchiveAPI } from '../../../api/ArchiveAPI';

@IonicPage({ name: "advert", segment: "advert" })
@Component({
  selector: 'insight-list',
  templateUrl: 'index.html',
})
export class AdvertPage {

  loading = true;
  searchValue: string;
	categoryColors: object;
	searchFilters: object[] = filterOptions;
	renderTimeStamp: Function = renderTimeStamp;
	getKeywordInfo: Function = getKeywordInfo;
	getKeywordText: Function = getKeywordText;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

  constructor(
    public navCtrl: NavController,
    public profile: ProfileModel, 
    public advert: AdvertModel,
    private alertCtrl: AlertController,
    public translate: TranslateService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getAdvertList()
  }

  private getAdvertList() {
		let self = this
		ArchiveAPI.getAdvertList(this.profile.cookie, insightFilterTypes.all)
			.then((result: any) => {
        console.log('getAdvertList', result)
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.advert.addData(result.results)
					self.showLoading(false)
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
  }

  public searchHandler (keyword, filter) {
		this.advert.applyFilter(keyword, filter);
	}

  private showLoading(show) {
		this.loading = show;
  }
  
  public showAdvertInfo (item) {
    console.log(item)

    // let insightModal = this.modalCtrl.create(
		// 	'InsightDetailsPage', { info, type: insightType.potential }
		// );

		// insightModal.present();
  }

  public starInsight(record_id, source, group, event) {
    const callback = () => { assignAdvertToModal(this.profile.cookie, this.advert) }
    
		return starItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source, group, null, callback);
	}

	public trashInsight(record_id, source, group, event) {
		const callback = () => { assignAdvertToModal(this.profile.cookie, this.advert) }
		return trashItem(this.profile.cookie, this.alertCtrl, this.translate, record_id, source, group, null, callback);
	}


}
