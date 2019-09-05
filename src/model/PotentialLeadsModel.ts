export class PotentialLeadsModel {

	public rawData: object[];
	public filteredData: object[];
	public numberOfPages: Number;
	public loadedPage: any;

	constructor() {}

	public addData(results, loadedPage,  numberOfPages?) {

		(loadedPage == 1 || !loadedPage) && (this.rawData = [])
		this.rawData = this.rawData.concat(results)
		this.filteredData = this.rawData; // when filter is done, this will removed.

		(numberOfPages) && (this.numberOfPages = numberOfPages)
		this.loadedPage = loadedPage;
	}

	public updateUsefulData (source, id, isUseful) {
		this.filteredData.map ((item:any) => {
			if (item.source == source && item._id == id) {
				item.useful = isUseful
			}
		})

		this.rawData.map ((item:any) => {
			if (item.source == source && item._id == id) {
				item.useful = isUseful
			}
		})
	}
}
