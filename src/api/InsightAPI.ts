import { Comms } from './Comms';
import * as Routes from './routes';

export class InsightAPI extends Comms {

    constructor() {
        super();
    }

    public static getGroupInsight(cookie:string, group:number):Promise<{}> {
        return new Promise((resolve, reject)=>{
			this.postFormData(Routes.groupInsight, { cookie, group })
                .then((response)=> {
                    resolve(response);
                })
                .catch(reject);
        });
    }

	public static getInsightSummary(cookie: string): Promise<{}> {
        return new Promise((resolve, reject) => {
			this.postFormData(Routes.insightSummary, { cookie })
                .then((response) => {
                    resolve(response);
                })
                .catch(reject);
        });
    }

	public static getInsightByAuthorId(cookie, authorid, source):Promise<{}> {
        return new Promise((resolve, reject)=>{
			this.postFormData(Routes.insightByAuthorId, { cookie, authorid, source })
            .then((response:any)=> {
                resolve(response);
            })
            .catch(reject);
        });
	}

	public static getInsightTotalAmount(cookie: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.insightTotalAmount, { cookie })
				.then((response: any) => {
					resolve(response);
				})
				.catch(reject);
		});
	}
}