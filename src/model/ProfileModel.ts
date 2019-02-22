export class ProfileModel {

    // Special
    // get current user profile from backend
    public userId: number;
    public cookie: string;
    public registration_id:string; // not implement yet
    public username: string; // not use
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
    public updatedAt: number;
    public registered: string;

    constructor() {
    }
}
