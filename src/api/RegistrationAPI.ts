import { Comms } from './Comms';
import * as Routes from './routes';

export class RegistrationAPI extends Comms {

    serverUrl = '/'

    constructor() {
        super();
    }

    public static createNewUser(registrationData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(Routes.register, registrationData)
                .then((response)=> {
                    resolve(response);
                })
                .catch(reject);
        });
    }

    public static setNewGroupReservation(registrationData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(Routes.groupReserve, registrationData)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }

    public static setResendEmail(emailId:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(`resendemail`, emailId)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }

    public static setResetPassword(registrationID:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(Routes.resetPassword, registrationID)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }
}