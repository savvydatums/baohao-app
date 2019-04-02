import { Component, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HeaderComponent } from '../../../../components/header/header';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar';

@IonicPage({ name: 'Potential', segment: 'potential'})
@Component({
  selector: 'potential',
  templateUrl: 'index.html',
})
export class PotentialPage {
	searchValue: string;
	categoryColors: object;

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild(forwardRef(() => SearchBarComponent)) searchBar


	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PotentialPage');
	}

}
