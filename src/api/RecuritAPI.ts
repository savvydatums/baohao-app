import { Comms } from './Comms';
import * as Routes from './routes';

declare var cordova: any;

export class RecuritAPI extends Comms {

    constructor() {
        super();
	}
	
	public static getRecuritUsers(cookie:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
			cordova.plugin.http.post(Routes.recuritUsers, {cookie}, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200) {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
        });
    }

    public static getRecuritUserDetails(cookie:string, authorid:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
			cordova.plugin.http.post(Routes.recuritUserDetails, {cookie, authorid}, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200) {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
        });
    }
}