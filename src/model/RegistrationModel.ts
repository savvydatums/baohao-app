export class RegistrationModel {

    // user set from form
    public registrationId:string;
    public password:string;
    public lastname:string;
    public firstname:string;
    public email:string;
    public mobile:string;
    public companyName:string;
    public jobTitle:string;
    public dob:string;
    public gender:string;

    // set by backend
    public userId:number;
    public emailId:number;

    constructor() {

    }
}
