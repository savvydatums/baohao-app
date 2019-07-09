import { insightSearchFilters, filterOptions, keywordsSettings } from '../pages/dashboard/insights/settings/settings';

export class AllInsightsModel {

	public rawData: object[];
	public filteredData: object[];
	public filters: object[];
	public categories: object[] = [];
	public topOptions: object[] = [];

	constructor() {
	}

	public addData(results) {
		this.filteredData = this.rawData = results;
	}

	public applyFilter2(keyword) {
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

	public setCategoryInfo(language) {
		if (this.categories.length > 0 && this.topOptions.length > 0) { return false }

		//reset first
		this.categories = [];
		this.topOptions = [];

		for (let key in keywordsSettings.allClient) {
			this.categories.push({
				value: key,
				name: keywordsSettings.allClient[key][language],
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
}
