import { Comms } from './Comms';
import * as Routes from './routes';

declare var cordova: any;

export class PostAPI extends Comms {

    constructor() {
        super();
	}
	
	public static getPostsCategories(cookie:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
			cordova.plugin.http.post(Routes.postCategory, {cookie}, {}, (response) => {
				const result = JSON.parse(response.data)
				console.log(result)
				if (response.status == 200) {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
        });
    }

    public static getPostsFromCategory(cookie:string, category:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
			cordova.plugin.http.post(Routes.postList, {cookie, category}, {}, (response) => {
				const result = JSON.parse(response.data)
				console.log(result)
				if (response.status == 200) {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) });
        });
    }
}