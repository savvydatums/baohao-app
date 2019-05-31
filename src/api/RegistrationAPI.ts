import { Comms } from './Comms';
import * as Routes from './routes';

declare var cordova: any;

export class RegistrationAPI extends Comms {

    constructor() {
        super();
    }

    public static createNewUser(registrationData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
			cordova.plugin.http.setDataSerializer('json')
			cordova.plugin.http.post(Routes.register, registrationData, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200) {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
        });
    }

    public static sendGroupReservation(reserveData:any):Promise<{}> {
        return new Promise((resolve, reject)=>{
			cordova.plugin.http.post(Routes.groupReserve, reserveData, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
        });
    }

    public static sendIndividualAppointment(appointmentData: any):Promise<{}> {
        return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.individualReserve, appointmentData, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
        });
	}
}