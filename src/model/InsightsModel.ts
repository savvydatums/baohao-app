export class InsightsModel {

    public medicalList:object[];
    public savingAndLife: object[];
    public investment: object[];
    public general: object[];

    constructor() {}

    // show each categories and it's count
    public getCategoriesCount () {
        return {
            medicalList: this.medicalList.length,
            savingAndLife: this.savingAndLife.length,
            investment: this.investment.length,
            general : this.general.length
        }
    }
}
