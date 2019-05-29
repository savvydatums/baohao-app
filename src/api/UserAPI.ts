import { Comms } from './Comms';
import * as Routes from './routes';
import { TLoginRequestPayload } from '../model/types';

declare var cordova: any; // just to stop TS annoying me

export class UserAPI extends Comms {

    constructor() {
        super();
	}

	public static getUserInfo(cookie: string): Promise<{}> {
		return cordova.plugin.http.post(Routes.getUserInfo, {cookie});
	}

	// public static getUserInfo(cookie:string):Promise<{}> {
	// 	return new Promise((resolve, reject) => {
	// 		this.postFormData(Routes.getUserInfo, { cookie })
	// 			.then((response) => {
	// 				resolve(response);
	// 			})
	// 			.catch(reject);
	// 	});
	// }

    // public static userLogin(userLoginInfo:TLoginRequestPayload):Promise<{}> {
    //     return new Promise((resolve, reject)=>{
    //         this.postFormData(Routes.login, userLoginInfo)
    //             .then((response)=> {
    //                 resolve(response);
    //             })
    //             .catch(reject);
    //     });
	// }

	public static userLogin(userLoginInfo: TLoginRequestPayload, successCallback, failCallback): void {
		cordova.plugin.http.post(Routes.login, userLoginInfo, {}, (response)=>{
			const result = JSON.parse(response.data)
			//console.log(response.data, result)
			if (response.status == 200 && result.status == 'ok'){
				successCallback(result)
			} else {
				failCallback(JSON.stringify(response))
			}
		}, failCallback);
	}

    public static updateUser(userNewData:any): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.postFormData(Routes.updateUserInfo, userNewData)
                .then((response) => {
                    resolve(response);
                })
                .catch(reject);
        });
    }

    public static sendResetPassword(newPasswordPayload:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
			this.postFormData(Routes.resetPassword, newPasswordPayload)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
	}

	public static sendForgetPassword(username: string, email: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.forgetPassword, { username, email })
				.then((response: any) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static logout(cookie: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.logout, { cookie })
				.then((response: any) => {
					resolve(response);
				})
				.catch(reject);
		});
	}
}