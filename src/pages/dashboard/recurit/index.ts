import { Component, forwardRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { RecuritAPI } from '../../../api/RecuritAPI';
import { TranslateService } from '@ngx-translate/core';
import { showError } from '../../../utils/alert-generic';
import { RecruitModel } from '../../../model/RecruitModel';
import { HeaderComponent } from '../../../components/header/header';
import { SearchBarComponent } from '../../../components/search-bar/search-bar';

@IonicPage({ name: "recruit", segment: "recruit" })
@Component({
	selector: 'recurit',
	templateUrl: 'index.html',
})

export class RecuritPage {

	loading: boolean = true;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

	constructor(
		public navCtrl: NavController,
		public profile: ProfileModel,
		public recruit: RecruitModel,
		private alertCtrl: AlertController,
		public translate: TranslateService,
		public modalCtrl: ModalController,
		public navParams: NavParams) {
	}

	ngAfterViewInit() {
		this.addFilterLabel()
		this.getRecuritUsers(this.profile.cookie)
	}

	private addFilterLabel () {
		let currentLang = this.translate.currentLang || this.translate.defaultLang
		this.recruit.addFilterLabel(currentLang);
	}

	private getRecuritUsers(cookie) {
		RecuritAPI.getRecuritUsers (cookie)
			.then((payload: any) => {
				if (payload.result) { // will change when become an array
					this.recruit.addData(payload.result)
					this.loading = false
				} else {
					showError(this.alertCtrl, this.translate, payload.message || payload.status)
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error)
			})
	}

	public getRecuirtUserDetails (authorid) {
		RecuritAPI.getRecuritUserDetails (this.profile.cookie, authorid)
			.then((payload: any) => {
				if (payload.result) {
					this.openUserDetails(payload.result[0]) // this will provide an array as well
				} else {
					showError(this.alertCtrl, this.translate, payload.message || payload.status)
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error)
			})
	}

	private openUserDetails (result) {
		let infoDetailsModal = this.modalCtrl.create(
			'RecruitDetailsPage', { info: result }
		);
		infoDetailsModal.present();	
	}

	public searchHandler (keyword, filter) {
		if (keyword) {
			this.recruit.filter(keyword, filter ? filter : 'both')
		} else {
			this.recruit.reset()
		}
	}

	public fetchTranslation(key) {
		if (key) {
			return this.translate.instant(key);
		}
	}

}
