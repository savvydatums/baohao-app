import * as keywords from '../../../../assets/json/keyword-settings'

export const keywordsSettings = keywords;

export const insightSearchFilters = ['By Name', 'By Content'];
export const recruitFilters = ['By Name', 'By Interest'];

export const filterOptions = [
	{ value:'name', label: '', en: 'By Name', cn: '根據名字', checked: true},
	{ value:'content', label: '', en: 'By Content', cn: '根據內容', checked: true}
]

export const recruitFilterOptions = [
	{ value:'name', label: '', en: 'By Name', cn: '根據名字', checked: true},
	{ value:'interest', label: '', en: 'By Interest', cn: '根據興趣', checked: true}
]

export const starFilters = ['Potential', 'General'];

export const insightFilterTypes = {
	all: 'notrash',
	archive : 'onlyarchive',
	trash: 'onlytrash'
}

export const insightType = {
	all: 'allClient',
	potential: 'potential'
}

export const appointmentTime = [
	'9:30 - 10:30', 
	'10:30 – 11:30',
	'11:30 – 12:30',
	'12:30 - 13:30',
	'13:30 - 14:30',
	'14:30 - 15:30',
	'15:30 - 16:30',
	'16:30 - 17:30',
	'17:30 - 18:30'
]

export const appointmentLocationEN = [
	{ 
		name: 'Kwun Tong',
		address: '6/F, KOHO, 75 Hung To Road, Kwun Tong, KLN'
	},
	{
		name: 'Central',
		address: 'Room 2504, China Insurance Group Building, 141 Des Voeux Road Central, HK'
	}
]

export const appointmentLocationCN = [
	{ 
		name: '觀塘',
		address: '香港九龍觀塘鴻圖道75號KOHO 6樓'
	},
	{
		name: '中環',
		address: '香港中環德輔道中141號中保集團大廈2504室'
	}
]