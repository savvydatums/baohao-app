import { recruitFilterOptions } from '../pages/dashboard/insights/settings/settings';

export class RecruitModel {

	public rawData: any[] = [];
	public filteredData: object[] = [];
	public numberOfPages: Number = 0;
	public loadedPage: any = 0;
    public keyword: string = '';
    public filterType: string = recruitFilterOptions[0];
    public filterOptions: object[] = recruitFilterOptions;

	constructor() { }

    public addData (result) {
        this.rawData = this.filteredData = result;
    }

    public addFilterLabel (lang) {
        recruitFilterOptions.map (item => {
            item.label = item[lang]
        })
    }

    public filter (keyword, filterType) {
        let filtered = this.rawData.filter(item => {
            const name = item.authorName.toLowerCase();
            const topics = Object.keys(item.topicChart).map(key => key.substring(5).toLowerCase())
            const word = keyword.toLowerCase()

             if (filterType == 'name') {
                return name.indexOf(word) >= 0
            } else if (filterType == 'interest') {
                return topics.indexOf(word) >= 0
            } else {
                return name.indexOf(word) >= 0 || topics.indexOf(word) >= 0
            }
        });
        this.filteredData = filtered
    }
    
    public reset () {
        this.filteredData = this.rawData;
    }
}
