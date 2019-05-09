import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

  // private getAuthorInfo (cookie, authorid, source, category) {
	//	InsightAPI.getInsightByAuthorId(cookie, authorid, source, category)
	// 		.then((result: any) => {
	// 			if (result.status == InsightResponseStatus.SUCCESS) {
	// 				this.authorData = result.results;
	// 			} else {
	// 				//this.showError(result.message);
	// 			}
	// 		}, error => {
	// 			//this.showError(error);
	// 		});
	// }
}
