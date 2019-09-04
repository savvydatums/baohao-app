export class AdvertModel {

	public rawData: object[];
	public filteredData: object[];
	public numberOfPages: Number = 0;
	public loadedPage: any = 0;

	constructor() {

	}
	public addData(results, loadedPage, numberOfPages?) {

		(loadedPage == 1) && (this.rawData = [])
		this.rawData = this.rawData.concat(results)
		this.filteredData = this.rawData; // when filter is done, this will removed.
		(numberOfPages) && (this.numberOfPages = numberOfPages)
		this.loadedPage = loadedPage;

	}

	public applyFilter(keyword, filter) {
		this.filteredData = this.rawData.filter((item: any) => {
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