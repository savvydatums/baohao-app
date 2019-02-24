import { Comms } from './Comms';
import * as Routes from './routes';

export class RegistrationAPI extends Comms {

    constructor() {
        super();
    }

    public static createNewUser(registrationData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postJSONData(Routes.register, registrationData)
                .then((response)=> {
                    resolve(response);
                })
                .catch(reject);
        });
    }

    public static sendGroupReservation(reserveData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
            this.postFormData(Routes.groupReserve, reserveData)
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
    }

    public static sendIndividualAppointment(appointmentData: any):Promise<{}> {
        return new Promise((resolve, reject) => {
            this.postFormData(Routes.individualReserve, appointmentData)
                .then((response: any) => {
                    resolve(response);
                })
                .catch(reject);
        });
    }
}