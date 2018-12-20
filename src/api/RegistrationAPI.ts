import { Comms } from './Comms';

export class RegistrationAPI extends Comms {

    private static serverUrl:string = '/'

    constructor() {
        super();
    }

    public static setNewUser(registrationData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(`${this.serverUrl}/register`, registrationData)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }

    public static setNewGroupReservation(registrationData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(`${this.serverUrl}/groupregister`, registrationData)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }

    public static setResendEmail(emailId:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(`${this.serverUrl}/resendemail`, emailId)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }

    public static setResetPassword(registrationID:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postData(`${this.serverUrl}/resetpassword`, registrationID)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }
}