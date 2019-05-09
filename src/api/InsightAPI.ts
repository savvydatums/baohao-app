import { Comms } from './Comms';
import * as Routes from './routes';

export class InsightAPI extends Comms {

    constructor() {
        super();
	}

	public static getAllClientInsight(cookie: string, querytype:string):Promise<{}> {
        return new Promise((resolve, reject)=>{
			this.postFormData(Routes.groupInsight, { cookie, querytype })
                .then((response)=> {
                    resolve(response);
                })
                .catch(reject);
        });
	}

	public static getPotentialInsight(cookie: string, querytype: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.potentialInsight, { cookie, querytype })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static getInsightByAuthorId(cookie, authorid, source, category):Promise<{}> {
        return new Promise((resolve, reject)=>{
			this.postFormData(Routes.insightByAuthorId, { cookie, authorid, source, category })
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

	public static getRecommendation(cookie:string, group:string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.productLinks, { cookie, group })
				.then((response: any) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static edit_user_profile(
		cookie:string, source:string, record_id:string, timestamp:string,
		existing_customer:boolean|null, remove_two_months: boolean|null, nickname: string|null): Promise<{}>{

		return new Promise((resolve, reject) => {
			this.postFormData(Routes.editUserPreference,
				{ cookie, source, record_id, timestamp, existing_customer, remove_two_months, nickname })
				.then((response: any) => {
					resolve(response);
				})
				.catch(reject);
		});
	}
}