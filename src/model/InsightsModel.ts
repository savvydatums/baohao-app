export const groupIdMapping = {
	all: 'all',
	medical: 1,
	savingAndLife: 2,
	investment: 3,
	general: 4,
	// employeeBenefits: 5,
	// others: 6
}

export class InsightsModel {

	public groupRawData: object[];
	public currentGroupData: object[];
	public currentGroupId: number|string;
	public currentGroupName: string;

	public summary: any;
	public summaryInArray: object[];

    constructor() {
		this.currentGroupId = groupIdMapping.all; // default
		this.summary = {}
	}

	public assignGroupData (results, groupId) {
		console.log('getGroupInsight assign Data', results, groupId)
		this.currentGroupData = this.groupRawData = results
		this.currentGroupName = Object.keys(groupIdMapping)
			.find(key => groupIdMapping[key] === parseInt(groupId))
		this.currentGroupId = groupId
	}

	public assignInsightSummary (results) {
		this.summary = results
		this.summaryInArray = []; // reset

		for (let group in this.summary) {

			if (!groupIdMapping[group]) { return false; }

			let authors = []
			for (let ppl in this.summary[group].author) {
				authors.push(this.summary[group].author[ppl])
			}

			this.summaryInArray.push({
				key: group,
				amount: this.summary[group].amount,
				author: authors,
				categories: this.summary[group].categories || [],
				groupId: this.summary[group].groupId
			})
		}

		console.log('assignSummarySimpleInfo assign Data', results, this.summaryInArray)
	}

	public applyFilter(keyword) {
		this.currentGroupData = this.groupRawData.filter((item:any) => {
			return item.content.indexOf(keyword) !== -1
		})
	}
}
