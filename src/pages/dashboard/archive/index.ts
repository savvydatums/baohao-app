import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsightResponseStatus } from '../../../api/Comms';
import { ArchiveAPI } from '../../../api/ArchiveAPI';
import { ProfileModel } from '../../../model/ProfileModel';
import { ArchiveModel } from '../../../model/ArchiveModel';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({ name: "archive", segment: "archive" })
@Component({
  selector: 'AllClient',
  templateUrl: 'index.html'
})

export class ArchivePage {

	loading = true;

	constructor(
		public navCtrl: NavController,
		public archive: ArchiveModel,
		public translate: TranslateService,
		public profile: ProfileModel) {
	}

	ngAfterViewInit() {
		this.getArchiveData(this.profile.cookie)
		this.showLoading(true)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Archive page');
	}

	private getArchiveData (cookie) {
		ArchiveAPI.getArchiveList(cookie)
			.then((result: any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.archive.assignArchiveData(result.results)
					this.showLoading(false)
				} else {

				}
			}, error => {

			});
	}

	private showLoading (show) {
		this.loading = show
	}

	public renderTimeStamp(timestamp: number) {
		const time = parseInt(timestamp + '000')
		return new Date(time).toDateString()
	}

	public shortenContent(content) {
		const lang = this.translate.currentLang || this.translate.defaultLang
		let stringNumber = lang == 'en' ? 8 : 20
		return content.substring(0, stringNumber);
	}
}
