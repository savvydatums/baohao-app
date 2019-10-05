export class ArchiveModel {

	public rawData: object[] = [];
	public filteredData: object[] = [];

	constructor() {

	}
	public addData(results) {
		this.filteredData = this.rawData = results;
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