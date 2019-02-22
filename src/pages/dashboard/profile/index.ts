import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { ProfileMockResponse, ProfileUpdateMockResponse } from '../../../api/profile-mock-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fetchCompaniesFromLocale } from '../../../utils/Data-Fetch';

@IonicPage({ name: "profile", segment: "profile"})
@Component({
    selector: 'profile',
	templateUrl: 'index.html'
})

export class ProfilePage {

	profileForm: FormGroup;
    companies: Object;

	constructor(
		public navCtrl: NavController,
		public profile: ProfileModel,
		public translate: TranslateService,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController) {

		this.profileForm = this.formBuilder.group({
			lastname: ['', Validators.required],
			firstname: ['', Validators.required],
			mobile: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(15),
				Validators.minLength(7),
			])],
			company_name: ['', Validators.required],
            job_title: [''],
            birth: ['', Validators.required],
			gender: ['', Validators.required]
		});
	}

	ngAfterViewInit() {
		// insert all response data into here, here should happen in the login
		const {
			registration_id, lastname, firstname,
			email, mobile, company_name, job_title, birth,
			gender, avatar, registered
		} = ProfileMockResponse.user // should come from Model when receive in initial called

		this.profile.registration_id = registration_id
        this.profile.lastname = lastname
        this.profile.firstname = firstname
		this.profile.email = email
		this.profile.mobile = mobile
		this.profile.company_name = company_name
        this.profile.job_title = job_title
        this.profile.birth = new Date(birth).toISOString()
		this.profile.gender = gender
		this.profile.avatar = avatar
        this.profile.registered = registered


        const store = this.translate.store
        this.companies = fetchCompaniesFromLocale(store.currentLang, store.defaultLang, store.translations)

    }

    public onUpdate () {

        console.log (this.profile)
        const controls = this.profileForm.controls

        const requestPayload = {
            cookie: this.profile.cookie,
            lastname: controls.lastname.value,
            firstname: controls.firstname.value,
            company_name: controls.company_name.value,
            mobile: controls.mobile.value,
            job_title: controls.job_title.value,
            birth: controls.birth.value,
            gender: controls.gender.value
        }

        console.log('requestPayload', requestPayload, ProfileUpdateMockResponse)

        /*
        * API call for posting update user info
        * https://13.70.23.104/wordpress/index.php/api/auth/update_user
		UserAPI.updateUser(requestPayload)
		.then((success)=> {
			console.log(success);
		},
		(error:any)=> {
			console.log(error);
		});
        */
        // show in page popup fail or succeed
        //const response = ProfileUpdateMockResponse;
        this.sendPopup(ProfileUpdateMockResponse.status == 'ok')
    }

    private sendPopup (isFail) {
        const title = isFail ? 'Update Failed!' : 'Update Succeed!'
        const message = isFail ? 'we can not update it now, try again later': 'update succeed!'

        const alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [{
                text: 'Cancel'
            }]
        })

        alert.present()
    }

}
