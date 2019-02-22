export class InsightsModel {

    public medicalList:object[];
    public savingAndLife: object[];
    public investment: object[];
    public general: object[];

    public shownList: object[];
    public selected: string;

    constructor() {}

    // show each categories and it's count
    public getCategoriesCount () {
        return {
            'Medical': this.medicalList.length,
            'Saving & Life': this.savingAndLife.length,
            'Investment': this.investment.length,
            'General': this.general.length
        }
    }

    public setShownContent (listName?) {
        if (!listName) {
            this.shownList = this.medicalList
            this.selected = 'medicalList'
        } else {
            this.shownList = this[listName]
            this.selected = listName
        }
    }
}
