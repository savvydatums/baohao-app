import { insightSearchFilters } from '../pages/dashboard/insights/settings/settings';

export class PotentialLeadsModel {

	public rawData: object[];
	public filteredData: object[];

	constructor() {}

	public addData(results) {
		this.rawData = [];
		for(let key in results) {
			results[key]._id && this.rawData.push(results[key]);
		}
		this.filteredData = this.rawData;
	}

	public applyFilter(keyword, filter) {
		this.filteredData = this.rawData.filter((item:any) => {
			if (filter == insightSearchFilters[0] && keyword.length > 0) {
				return item.authorName.toLowerCase().includes(keyword.toLowerCase())
			} else if (filter == insightSearchFilters[1] && keyword.length > 0) {
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
