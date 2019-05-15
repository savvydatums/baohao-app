import { Comms } from './Comms';
import * as Routes from './routes';

export class ArchiveAPI extends Comms {

	constructor() {
		super();
	}

	public static getArchiveList(cookie:string) : Promise < {} > {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.archiveList, { cookie })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static archiveItem(cookie: string, record_id: string, source: string, group: string, category: string[]): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.archiveItem, { cookie, record_id, source, group, category })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static unArchiveItem(cookie: string, record_id: string, source: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.unArchiveItem, { cookie, record_id, source })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}

	public static trashItem(cookie : string, record_id : string, source : string, group : string, categorie : string[]) : Promise < {} > {
		return new Promise((resolve, reject) => {
			this.postFormData(Routes.trashItem, { cookie, record_id, source, group, categorie })
				.then((response) => {
					resolve(response);
				})
				.catch(reject);
		});
	}
}