import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HeaderComponent } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar';
import { AllInsightsModel } from '../../../../model/AllInsightsModel';
import { ProfileModel } from '../../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({ name: 'Potential', segment: 'potential'})
@Component({
  selector: 'potential',
  templateUrl: 'index.html',
})
export class PotentialPage {

	searchValue: string;
	categoryColors: object;
	loading = true;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public insights: AllInsightsModel,
		public profile: ProfileModel,
		public translate: TranslateService,
		public modalCtrl: ModalController) {
	}

	ngAfterViewInit() {
		this.showLoading(true)
	}

	private showLoading(show) {
		this.loading = show
	}

}
