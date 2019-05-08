import {insightFilters} from '../pages/dashboard/insights/settings/settings';
export const insightFilterTypes = {
	all: 'notrash',
	archive : 'onlyarchive'
}


export class PotentialLeadsModel {

	public rawData: object[];
	public filteredData: object[];
	public filterType: string | null = null; // = By Name or By Content

	constructor() {}

	public addData(results) {
		this.rawData = [];
		for(let key in results) {
			results[key]._id && this.rawData.push(results[key]);
		}
		this.filteredData = this.rawData;
		console.log('getGroupInsight assign Data', this.filteredData)
	}

	public applyFilter(keyword, filter) {
		console.log('searchHandler', keyword, filter)
		this.filteredData = this.rawData.filter((item:any) => {
			if (filter == insightFilters[0]) {
				return item.authorName.indexOf(keyword) !== -1
			} else if (filter == insightFilters[1]){
				return item.content.indexOf(keyword) !== -1
			} else {
				return item.content.indexOf(keyword) !== -1 || item.authorName.indexOf(keyword) !== -1
			}
		})
	}
}
