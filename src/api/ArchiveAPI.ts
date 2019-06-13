import { Comms } from './Comms';
import * as Routes from './routes';

declare var cordova : any;

export class ArchiveAPI extends Comms {

	constructor() {
		super();
	}

	// tested, not use anymore
	public static getArchiveList(cookie:string) : Promise < {} > {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.archiveList, { cookie }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	// tested
	public static archiveItem(cookie: string, record_id: string, source: string, group: string, category: string[]): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.archiveItem, { cookie, record_id, source, group, category }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	//tested
	public static unArchiveItem(cookie: string, record_id: string, source: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.unArchiveItem, { cookie, record_id, source }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	// tested, not use anymore
	public static getTrashList(cookie: string): Promise<{}>{
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.trashList, { cookie }, {}, (response) => {
				const result = JSON.parse(response.data)
				console.log(Routes.trashList, response)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	// tested
	public static trashItem(cookie : string, record_id : string, source : string, group : string, categorie : string[]) : Promise < {} > {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.trashItem, { cookie, record_id, source, group, categorie }, {}, (response) => {
				const result = JSON.parse(response.data)
				if (response.status == 200 && result.status == 'ok') {
					resolve(result)
				} else {
					resolve(JSON.parse(response.data))
				}
			}, (response) => { reject(JSON.parse(response.error)) })
		});
	}

	public static unTrashItem(cookie: string, record_id: string, source: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			cordova.plugin.http.post(Routes.unTrashItem, { cookie, record_id, source}, {}, (response) => {
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