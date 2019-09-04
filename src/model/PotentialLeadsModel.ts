export class PotentialLeadsModel {

	public rawData: object[];
	public filteredData: object[];
	public numberOfPages: Number;
	public loadedPage: any;

	constructor() {}

	public addData(results, loadedPage,  numberOfPages?) {

		(loadedPage == 1) && (this.rawData = [])
		this.rawData = this.rawData.concat(results)
		this.filteredData = this.rawData; // when filter is done, this will removed.

		(numberOfPages) && (this.numberOfPages = numberOfPages)
		this.loadedPage = loadedPage;
	}

	// currently not affected as only have one page
	public applyFilter(keyword, filter) {
		// change to call rawData and the whole filter function will have to change
		this.filteredData = this.rawData.filter((item:any) => {
			if (filter == 'name' && keyword.length > 0) {
				return item.authorName.toLowerCase().includes(keyword.toLowerCase())
			} else if (filter == 'content' && keyword.length > 0) {
				return item.content.toLowerCase().includes(keyword.toLowerCase())
			} else {
				return item.content.toLowerCase().includes(keyword.toLowerCase())
					|| item.authorName.toLowerCase().includes(keyword.toLowerCase())
			}
		})
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
