import { insightSearchFilters } from '../pages/dashboard/insights/settings/settings';

export class AllInsightsModel {

	public rawData: object[];
	public filteredData: object[];

	constructor() {}

	public addData(results) {
		this.filteredData = this.rawData = results;
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
}
