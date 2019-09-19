import { filterOptions, keywordsSettings } from '../pages/dashboard/insights/settings/settings';

export class AllInsightsModel {

	public rawData: object[] = [];
	public filteredData: object[];
	public filters: object[];
	public categories: object[] = [];
	public topOptions: object[] = [];
	public numberOfPages: Number = 0;
	public loadedPage: any = 0;
	public keyword: string = '';

	constructor() {
	}

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

	public setCategoryInfo() {
		if (this.categories.length > 0 && this.topOptions.length > 0) { return false }

		//reset first
		this.categories = [];
		this.topOptions = [];

		for (let key in keywordsSettings.allClient) {
			this.categories.push({
				value: key,
				cn: keywordsSettings.allClient[key].cn,
				en: keywordsSettings.allClient[key].en,
				color: keywordsSettings.allClient[key].color,
				checked: true
			})
		}

		this.topOptions = filterOptions
	}

	public resetFilter(type) {
		if (type == 'all') {
			this.categories.map((item:any) =>  item.checked = true)
			this.topOptions.map((item:any) =>  item.checked = true)
		}
		if (type == 'category') {
			this.categories.map((item:any) =>  item.checked = true)
		}
	
		this.filteredData =  this.rawData;
	}

	public getCategories () {
		let results = []
		this.categories.map((item:any) => {
			if (item.checked == true) {
				results.push(item.value)
			}
		})
		return results
	}

	public getOptions () {
		let results = []
		this.topOptions.map((item:any) => {
			if (item.checked == true) {
				results.push(item.value)
			}
		})
		let searchMethod = ''
		if (results.length > 1 || results.length == 0) { 
			searchMethod = 'both'
		} else if (results.length <= 1) {
			searchMethod = results[0].value
		}
		return searchMethod
	}
}
