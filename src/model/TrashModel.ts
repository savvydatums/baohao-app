import { trashItem } from "./types";

export class TrashModel {

	public list: trashItem[] = [];

	constructor() {}

	public addData(results) {
		this.list = results;
	}

	public updateUsefulData (source, id, isUseful) {
		this.list.map ((item:any) => {
			if (item.source == source && item._id == id) {
				item.useful = isUseful
			}
		})
	}
}