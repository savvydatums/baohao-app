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
}