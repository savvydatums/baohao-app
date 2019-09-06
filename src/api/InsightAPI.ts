import { Comms } from './Comms';
import * as Routes from './routes';
import { configInsightListPayload } from '../utils/insight-util';

declare var cordova: any;

export class InsightAPI extends Comms {

    constructor() {
        super();
	}

	public static getAllClientInsight(cookie: string, querytype: string, page?: Number, search?:any): Promise<{}> {
		return new Promise((resolve, reject) => {
			
			let payload = configInsightListPayload (cookie, querytype, page, search)

			cordova.plugin.http.post(Routes.groupInsight, payload, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		})
	}

	public static getPotentialInsight(cookie: string, querytype: string, page?: Number, search?:any): Promise<{}> {
		return new Promise((resolve, reject) => {
			let payload = configInsightListPayload (cookie, querytype, page, search)

			cordova.plugin.http.post(Routes.potentialInsight, payload, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		})
	}

	public static getInsightByAuthorId(cookie, authorid, source, category): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.insightByAuthorId, { cookie, authorid, source, category }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	public static getInsightTotalAmount(cookie: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.insightTotalAmount, { cookie }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	public static getRecommendation(cookie: string, group: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.productLinks, { cookie, group }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	public static updateUserPreference(
		cookie: string, source: string, authorid: string, nickname?: string | null, existing_customer?: boolean | null,
		remove_two_months?: boolean | null, timestamp?: string | null, agent?: boolean | null): Promise<{}> {

		let basic = { cookie, source, authorid }
		let payload = {}
		nickname && (payload = { ...basic, nickname })
		existing_customer && (payload = { ...basic, existing_customer })
		remove_two_months && (payload = { ...basic, remove_two_months, timestamp })
		agent !== null && (payload = { ...basic, agent })

		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.editUserPreference, payload, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	public static getAuthorCategoryList(cookie, authorid, source): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.totalAmountByAuthorId, { cookie, authorid, source }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	public static updateInsightUseful (cookie: string, source: string, record_id: string, useful: boolean) {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.suggestionUseful, { cookie, record_id, source, useful }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}
}