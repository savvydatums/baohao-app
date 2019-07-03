import { insightSearchFilters, filterTopOptions, keywordsSettings } from '../pages/dashboard/insights/settings/settings';

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

	public applyFilter2(keyword) {
		this.filteredData = this.rawData.filter((item:any) => {
			let isInCategory = true
			item.categories.map((cat:any) => {
				const optionInfo:any = this.categories.filter((option: any) => option.value == cat)[0]
				isInCategory = optionInfo.checked
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
		for (let key in keywordsSettings.allClient) {
			this.categories.push({
				value: key,
				name: keywordsSettings.allClient[key][language],
				color: keywordsSettings.allClient[key].color,
				checked: true
			})
		}

		this.topOptions = filterTopOptions
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
