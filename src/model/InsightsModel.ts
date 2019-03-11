export const groupIdMapping = {
	medical: 1,
	savingAndLife: 2,
	investment: 3,
	general: 4,
	employeeBenefits: 5,
	others: 6
}

export class InsightsModel {

	public currentGroupData:object[];
	public currentGroupId: number;
	public currentGroupName: string;

	public summary: any;
	public summaryInArray: object[];

    constructor() {
		this.currentGroupId = 1; // default
		this.summary = {}
	}

	public assignGroupData (results, groupId) {
		console.log('getGroupInsight assign Data', results, groupId)
		this.currentGroupData = results
		this.currentGroupName = Object.keys(groupIdMapping)
			.find(key => groupIdMapping[key] === parseInt(groupId))
		this.currentGroupId = groupId
	}

	public assignInsightSummary (results) {
		console.log('assignSummarySimpleInfo assign Data', results)
		this.summary = results
		this.summaryInArray = []; // reset

		for (let group in this.summary) {

			let authors = []
			for (let ppl in this.summary.author) {
				authors.push(this.summary.author[ppl])
			}

			this.summaryInArray.push({
				key: group,
				amount: this.summary[group].amount,
				author: authors,
				categories: this.summary[group].categories || [],
				groupId: this.summary[group].groupId
			})
		}

	}
}
