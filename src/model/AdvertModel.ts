export class AdvertModel {

	public rawData: object[] = [];
	public filteredData: object[] = [];
	public numberOfPages: Number = 0;
	public loadedPage: any = 0;

	constructor() {}

	public addData(results, loadedPage, numberOfPages?) {

		if (results) {
			(loadedPage == 1 || !loadedPage) && (this.rawData = [])
			this.rawData = this.rawData.concat(results)
			this.filteredData = this.rawData; // when filter is done, this will removed.
			(numberOfPages) && (this.numberOfPages = numberOfPages)
			this.loadedPage = loadedPage;
		} else {
			this.rawData = null
		}
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