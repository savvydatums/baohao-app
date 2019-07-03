import { Comms } from './Comms';
import * as Routes from './routes';
import { TLoginRequestPayload } from '../model/types';

declare var cordova: any; // just to stop TS annoying me

export class UserAPI extends Comms {

    constructor() {
        super();
	}

	// tested
	public static getUserInfo(cookie: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.getUserInfo, { cookie }, {}, (response) => {
				const result = JSON.parse(response.data)

				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
		})
	}

	// tested
	public static userLogin(userLoginInfo: TLoginRequestPayload): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.login, userLoginInfo, {}, (response) => {
					const result = JSON.parse(response.data)
					if (response.status == 200 && result.status == 'ok') {
						resolve(result)
					} else {
						resolve(JSON.parse(response.data))
					}
				}, (response) => { reject(JSON.parse(response.error))})
			})
	}

	// tested
	public static updateUser(userNewData: any): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.updateUserInfo, userNewData, {}, (response) => {
					const result = JSON.parse(response.data)
					if (response.status == 200 && result.status == 'ok') {
						resolve(result)
					} else {
						resolve(JSON.parse(response.data))
					}
				}, (response) => { reject(JSON.parse(response.error))})
			})
	}

	// tested
	public static sendResetPassword(newPasswordPayload: any): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.resetPassword, newPasswordPayload, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		})
	}

	// tested
	public static sendForgetPassword(username: string, email: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.forgetPassword, { username, email }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200) {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		})
	}

	// tested
	public static logout(cookie: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.logout, { cookie }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200) {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}
}