export class PotentialLeadsModel {

	public rawData: object[];
	public filteredData: object[];
	public numberOfPages: Number;
	public loadedPage: Number;

	constructor() {}

	public addData(results, loadedPage,  numberOfPages?) {
		this.rawData = [];
		for (let key in results) {
			results[key]._id && this.rawData.push(results[key]);
		}
		this.filteredData = this.rawData;		
		this.loadedPage = loadedPage;
		console.log('current loaded page')

		if (numberOfPages) {
			this.numberOfPages = numberOfPages;
		}
	}

	public applyFilter(keyword, filter) {
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
