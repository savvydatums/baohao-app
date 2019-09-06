import { filterOptions, keywordsSettings } from '../pages/dashboard/insights/settings/settings';

export class AllInsightsModel {

	public rawData: object[] = [];
	public filteredData: object[];
	public filters: object[];
	public categories: object[] = [];
	public topOptions: object[] = [];
	public numberOfPages: Number = 0;
	public loadedPage: any = 0;

	constructor() {
	}

	public addData(results, loadedPage, numberOfPages?) {

		(loadedPage == 1 || !loadedPage) && (this.rawData = [])
		this.rawData = this.rawData.concat(results)
		this.filteredData = this.rawData; // when filter is done, this will removed.

		(numberOfPages) && (this.numberOfPages = numberOfPages)
		this.loadedPage = loadedPage;
	}

	public applyFilter(keyword) {
		// change to call rawData and the whole filter function will have to change
		this.filteredData = this.rawData.filter((item:any) => {
			let isInCategory = false

			item.categories.some((cat:any) => {
				const optionInfo:any = this.categories.filter((option: any) => option.value == cat)[0]
				if (optionInfo.checked == true) {
					isInCategory = true 
					return true
				}
			})

			let hasContentMatch = true
			if (keyword.length > 0 && isInCategory) {
				let isNameChecked = false
				let isContentChecked = false
				this.topOptions.map((option:any) => {
					if (option.value == 'name') { isNameChecked = option.checked }
					if (option.value == 'content') { isContentChecked = option.checked }
				})

				const nameMatched = isNameChecked && item.authorName.toLowerCase().includes(keyword.toLowerCase())
				const contentMatched = isContentChecked && item.content.toLowerCase().includes(keyword.toLowerCase())
				hasContentMatch = nameMatched || contentMatched
			}

			return isInCategory && hasContentMatch
		})
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
		console.log(results)
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
		if (results.length > 1) { 
			searchMethod = 'both'
		} else if (results.length <= 1) {
			searchMethod =  results[0].value
		}
		return searchMethod
	}
}
