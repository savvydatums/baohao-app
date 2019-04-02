import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileModel } from '../../../model/ProfileModel';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fetchCompaniesFromLocale, getTranslation } from '../../../utils/Data-Fetch';
import { UserAPI } from '../../../api/UserAPI';
import { sendGenericUpdateAlert } from '../../../utils/alert-generic';

@IonicPage({ name: "profile", segment: "profile"})
@Component({
    selector: 'profile',
	templateUrl: 'index.html'
})

export class ProfilePage {

	profileForm: FormGroup;
    companies: Object;
    isSubmitSuccess: boolean;
	newPassword: string|null;

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
		this.isSubmitSuccess = false;
		this.newPassword = null;
	}

	ngAfterViewInit() {
		// insert all response data into here, here should happen in the login
		const {
			registration_id, lastname, firstname,
			email, mobile, company_name, job_title, birth,
			gender, avatar, registered
		} = this.profile // should come from Model when receive in initial called

		this.profile.registration_id = registration_id
        this.profile.lastname = lastname
        this.profile.firstname = firstname
		this.profile.email = email
		this.profile.mobile = mobile
		this.profile.company_name = company_name
        this.profile.job_title = job_title
        this.profile.birth = birth && new Date(birth).toISOString()
		this.profile.gender = gender
		this.profile.avatar = avatar
        this.profile.registered = registered

        const store = this.translate.store
        this.companies = fetchCompaniesFromLocale(store.currentLang, store.defaultLang, store.translations)

    }

    public onUpdate () {
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

		UserAPI.updateUser(requestPayload)
            .then((result:any)=> {
				console.log(result);
				const isFail = result.status !== 'ok'
				sendGenericUpdateAlert(this.alertCtrl, this.translate, isFail)
            },
            (error:any)=> {
				sendGenericUpdateAlert(this.alertCtrl, this.translate, true, error)
            });
    }

	public promptResetPassword () {
		const alert = this.alertCtrl.create({
			title: getTranslation(this.translate, 'PASSWORD_RESET.TITLE'),
			message : getTranslation(this.translate, 'PASSWORD_RESET.RESET_INFO'),
			inputs: [{
				name: 'new_password',
				placeholder: getTranslation(this.translate, 'PASSWORD_RESET.NEW_PASS_PLACEHOLDER'),
				type: 'password'
			}],
			buttons: [{
				text: getTranslation(this.translate, 'GLOBA_CANCEL_BUTTON_LABEL')
			},{
				text: getTranslation(this.translate, 'GLOBAL_SUBMIT_BUTTON_LABEL'),
				handler: data => {
					this.submitNewPassword(data.new_password)
				}
			}],
			cssClass: 'reset-popup',
			enableBackdropDismiss: false
		})

		alert.present()
	}

	public submitNewPassword (newPass) {
		if (newPass && newPass.length > 0) {
			const payload = {
				cookie: this.profile.cookie,
				password: newPass
			}

			UserAPI.sendResetPassword(payload)
				.then((result: any) => {
					const isFail = result.status !== 'ok'
					sendGenericUpdateAlert(this.alertCtrl, this.translate, isFail)
				},
				(error: any) => {
					sendGenericUpdateAlert(this.alertCtrl, this.translate, true, error)
				});
		} else {
			const message = 'Input Field is empty'
			sendGenericUpdateAlert(this.alertCtrl, this.translate, true, message)
		}
	}
}
