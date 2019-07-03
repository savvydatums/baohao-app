import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage({ name: "SupportPage", segment: "SupportPage" })
@Component({
	selector: 'support',
	templateUrl: 'index.html',
})
export class SupportPage {

	bugForm: FormGroup;
	bugList: string[];
	submitted: boolean;

	constructor(
		public navCtrl: NavController,
		public translate: TranslateService,
		public navParams: NavParams,
		private formBuilder: FormBuilder) {
		this.submitted = false

		this.bugForm = this.formBuilder.group({
			bugs: ['', Validators.required],
			info: []
		});
	}

	ionViewWillEnter() {
		this.bugList = this.getBugReportList();
	}

	public getBugReportList () {
		const lang = this.translate.currentLang || this.translate.defaultLang
		const bugs = this.translate.translations[lang]['SUPPORT']['BUG_REPORT_OPTIONS']
		return bugs
	}
}