import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsightResponseStatus } from '../../../api/Comms';
import { ArchiveAPI } from '../../../api/ArchiveAPI';
import { ProfileModel } from '../../../model/ProfileModel';
import { ArchiveModel } from '../../../model/ArchiveModel';
import { TranslateService } from '@ngx-translate/core';
import { starFilters } from '../insights/settings/settings';
import { shortenContent, renderTimeStamp } from '../../../utils/insight-util';
import { HeaderComponent } from '../../../components/header/header';
import { SearchBarComponent } from '../../../components/search-bar/search-bar';

@IonicPage({ name: "archive", segment: "archive" })
@Component({
	selector: 'insight-list',
	templateUrl: 'index.html'
})

export class ArchivePage {

	//type: string = insightType.potential;
	loading = true;
	shortenContent: Function = shortenContent;
	renderTimeStamp: Function = renderTimeStamp;
	starFilters: string[] = starFilters;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

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

	public searchHandler(keyword, filter) {
		//this.insights.applyFilter(keyword, filter);
	}
}
