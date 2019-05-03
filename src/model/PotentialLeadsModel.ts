export const insightTypes = {
	all: 'notrash',
	archive : 'onlyarchive'
}

export class PotentialLeadsModel {

	public rawData: object[];
	public currentGroupData: object[];
	public currentGroupId: number | string = insightTypes.all;

	public potentialLeads: object[];

	public summary: any = {};
	public summaryInArray: object[];

	constructor() {}

	public assignGroupData (results, groupId) {
		console.log('getGroupInsight assign Data', results, groupId)
		this.currentGroupData = this.rawData = results
		this.currentGroupId = groupId
	}

	public assignPotentialLeads (results) {
		this.potentialLeads = results
	}

	public assignInsightSummary (results) {
		this.summary = results
		this.summaryInArray = []; // reset

		for (let group in this.summary) {

			//if (!groupIdMapping[group]) { return false; }

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
		this.currentGroupData = this.rawData.filter((item:any) => {
			return item.content.indexOf(keyword) !== -1
		})
	}
}
