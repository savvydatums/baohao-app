import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { insightFilterTypes, filterOptions } from '../insights/settings/settings';
import { HeaderComponent } from '../../../components/header/header';
import { SearchBarComponent } from '../../../components/search-bar/search-bar';
import { ProfileModel } from '../../../model/ProfileModel';
import { showError } from '../../../utils/alert-generic';
import { AdvertModel } from '../../../model/AdvertModel';
import { InsightResponseStatus } from '../../../api/Comms';
import { TranslateService } from '@ngx-translate/core';
import { getKeywordText, getKeywordInfo, renderTimeStamp, starItem, trashItem, assignAdvertToModal, assignClientInsightToModal } from '../../../utils/insight-util';
import { ArchiveAPI } from '../../../api/ArchiveAPI';
import { ArchiveModel } from '../../../model/ArchiveModel';
import { TrashModel } from '../../../model/TrashModel';

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
    public archive: ArchiveModel,
		public trash: TrashModel,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public translate: TranslateService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getAdvertList()
  }

  private getAdvertList() {
    let self = this
    const loadedPage = 1;
		ArchiveAPI.getAdvertList(this.profile.cookie, insightFilterTypes.all, loadedPage)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.advert.addData(result.results, loadedPage, result.num_of_pages)
					self.showLoading(false)
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
  }

  public searchHandler (keyword, filter) {
    const search = { keyword, searchtype: filter ? filter : 'both' }
		assignAdvertToModal(this.profile.cookie, this.advert, null, search)
	}

  private showLoading(show) {
		this.loading = show;
  }
  
  public showAdvertInfo (info) {
    let adverttModal = this.modalCtrl.create(
			'advert-details', { info }
    ); 
    // if created with file name index.tx, then use ionicPage name, not module name
		adverttModal.present();
  }

  public starInsight(record_id, source, group) {
    const callback = () => { 
        assignAdvertToModal(this.profile.cookie, this.advert, 1)
        assignClientInsightToModal(this.profile.cookie, this.archive, 1, null, null, null, insightFilterTypes.archive) 
    }
		return starItem(this.profile.cookie, this.toastCtrl, this.translate, record_id, source, group, null, callback);
	}

	public trashInsight(record_id, source, group) {
		const callback = () => { 
      assignAdvertToModal(this.profile.cookie, this.advert, 1) 
      assignClientInsightToModal(this.profile.cookie, this.trash, 1, null, null, null, insightFilterTypes.trash)
    }
		return trashItem(this.profile.cookie, this.toastCtrl, this.translate, record_id, source, group, null, callback);
  }
  
  public fetchTranslation(key) {
		if (key) {
			return this.translate.instant(key);
		}
  }
  
  public loadMoreData(event) {
    const successCallBack = () => { event.complete(); }
		const errorCallBack = (error) => { console.log(error); }
    const page = this.advert.loadedPage + 1
    
		assignAdvertToModal(this.profile.cookie, this.advert, page, null, successCallBack, errorCallBack)
  }
}
