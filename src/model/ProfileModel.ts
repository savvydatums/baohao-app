export class ProfileModel {

    // Special
    // get current user profile from backend
    public cookie: string;
    public registration_id:string; // not implement yet
    public password:string; // no info // would be changing password
    public lastname:string;
    public firstname:string;
    public email:string;
    public mobile:string;
    public company_name:string;
    public job_title:string;
    public birth:string;
    public gender:string;
    public avatar: string;
    public registered: string;

    constructor() {
    }

    public setUserInfo (cookie, data) {
        this.cookie = cookie
        this.registration_id = data.registration_id
        this.lastname = data.lastname
        this.firstname = data.firstname
        this.email = data.email
        this.mobile = data.mobile
        this.company_name = data.company_name
        this.job_title = data.job_title
        this.birth = data.birth
        this.gender = data.gender
        this.avatar = data.avatar
        this.registered = data.registered
    }
}
