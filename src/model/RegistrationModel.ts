export class RegistrationModel {

    // user set from form
    public registration_id:string;
    public password:string;
    public lastname:string;
    public firstname:string;
    public email:string;
    public mobile:string;
    public companyName:string;
    public jobTitle:string;
    public dob:string;
    public gender:string;

    // it is a duplication of backend needed
    public username:string;

    constructor() {

    }
}
