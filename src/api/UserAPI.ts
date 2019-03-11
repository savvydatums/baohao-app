import { Comms } from './Comms';
import * as Routes from './routes';
import { TLoginRequestPayload } from '../model/types';

export class UserAPI extends Comms {

    constructor() {
        super();
    }

    public static userLogin(userLoginInfo:TLoginRequestPayload):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postFormData(Routes.login, userLoginInfo)
                .then((response)=> {
                    resolve(response);
                })
                .catch(reject);
        });
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
}