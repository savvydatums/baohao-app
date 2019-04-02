export class ArchiveModel {

	public archiveRawData: object;
	public list: object[];

	constructor() {

	}

	public assignArchiveData (results) {
		console.log (results)
		this.list = results;
	}

}