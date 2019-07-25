import { trashItem } from "./types";

export class TrashModel {

	public list: trashItem[];

	constructor() {}

	public addData(results) {
		this.list = results;
	}
}