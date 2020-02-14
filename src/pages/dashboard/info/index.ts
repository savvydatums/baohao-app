import { Component, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Slides, AlertController, ModalController } from 'ionic-angular';
import { HeaderComponent } from '../../../components/header/header';
import { ProfileModel } from '../../../model/ProfileModel';
import { PostModel } from '../../../model/PostModel';
import { PostAPI } from '../../../api/PostAPI';
import { InsightResponseStatus } from '../../../api/Comms';
import { TranslateService } from '@ngx-translate/core';
import { showError } from '../../../utils/alert-generic';

@IonicPage({ name: "InfoPage", segment: "InfoPage" })
@Component({
	selector: 'info',
	templateUrl: 'index.html',
})
export class InfoPage {

	tabElementWidth_px :number= 100;
	tabs:string[] = [];
	categories:string[] = [];
	loading: boolean = true;
	lang : string ;

	defaultBgUrl: string = '/assets/imgs/default_logo_bg.jpg';

	@ViewChild(forwardRef(() => HeaderComponent)) header
	@ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides
	@ViewChild('scroll') scroll: Content
	@ViewChild('indicator') SwipedTabsIndicator: ElementRef
	
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public posts: PostModel,
		public profile: ProfileModel,
		private alertCtrl: AlertController,
		public translate: TranslateService,
		public modalCtrl: ModalController,
		) {
		this.lang =  translate.currentLang || translate.defaultLang
	}

	ionViewDidLoad() {
		this.getPostCategory()
	}

	getPostCategory() {

		PostAPI.getPostsCategories(this.profile.cookie)
			.then((result:any) => {
				if (result.status == InsightResponseStatus.SUCCESS) {
					this.tabs = this.lang == 'en' ? result.posts_category_en : result.posts_category_zh;
					this.categories = result.posts_category
					this.getPostsDataFromCategory(result.posts_category)
				} else {
					showError(this.alertCtrl, this.translate, result.message);
				}
			}, error => {
				showError(this.alertCtrl, this.translate, error);
			});
	}

	getPostsDataFromCategory (categories) {
		let count = categories.length;

		const self = this;
		categories.map (catName => {
			PostAPI.getPostsFromCategory(self.profile.cookie, catName)
				.then((result:any) => {
					if (result.status == InsightResponseStatus.SUCCESS) {
						self.posts.addDataToCategory(catName, result.posts)
					} else {
						showError(this.alertCtrl, this.translate, result.message);
					}
					count --;
					if (count <= 0) { self.loading = false }
				}, error => {
					showError(this.alertCtrl, this.translate, error);
				});
		})
	}

	selectTab(index) {
		this.SwipedTabsIndicator.nativeElement.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
		this.scroll.scrollTo(index*this.tabElementWidth_px,0,500);
		this.SwipedTabsSlider.slideTo(index, 500);
	}

	updateIndicatorPosition() {
		this.scroll.scrollTo(this.SwipedTabsSlider.getActiveIndex()*this.tabElementWidth_px,0,200);

		// this condition is to avoid passing to incorrect index
		if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
		{
			this.SwipedTabsIndicator.nativeElement.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
		}

	}

	animateIndicator($event) {
		if(this.SwipedTabsIndicator)
			this.SwipedTabsIndicator.nativeElement.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
	}

	onClickPost(postData) {
		let infoDetailsModal = this.modalCtrl.create(
			'InfoDetailsPage', { postData }
		);
		infoDetailsModal.present();		
	}

	getPath (imgPath) {
		return (imgPath && imgPath.length > 0) ? imgPath : this.defaultBgUrl
	}

	getClass (imgPath) {
		return imgPath == false ? 'default' : ''
	}

}
