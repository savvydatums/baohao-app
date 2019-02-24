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

    public static updateUser(userNewData): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.postFormData(Routes.updateUserInfo, userNewData)
                .then((response) => {
                    resolve(response);
                })
                .catch(reject);
        });
    }

    public static setResetPassword(registrationID:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postFormData(Routes.resetPassword, registrationID)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }
}