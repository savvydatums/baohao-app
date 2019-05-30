import { Comms } from './Comms';
import * as Routes from './routes';

declare var cordova : any;

export class ArchiveAPI extends Comms {

	constructor() {
		super();
	}

	// not really been used
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

	public static getArchiveListOld(cookie: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.archiveList, { cookie })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static archiveItemOld(cookie: string, record_id: string, source: string, group: string, category: string[]): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.archiveItem, { cookie, record_id, source, group, category })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static unArchiveItemOld(cookie: string, record_id: string, source: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.unArchiveItem, { cookie, record_id, source })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static trashItemOld(cookie: string, record_id: string, source: string, group: string, categorie: string[]): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.trashItem, { cookie, record_id, source, group, categorie })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}
}