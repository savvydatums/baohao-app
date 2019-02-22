// https://13.70.23.104/wordpress/index.php/api/auth/get_currentuserinfo
// form data: {
// "cookie": "testyuser_editor2 | 1550548435 | S5yFfbHpv67XmLK1ppi5NdH5OxDVwc8XG4xjJVYMFMv | 7f91426d37d9967b2ecbff22438ccf6c48420fad3a7936ab0901b7478487519a"
// }
export const ProfileMockResponse = {
    "status": "ok",
    "user": {
        "id": 4,
        "username": "testyuser_editor2",
        "nicename": "testyuser_editor2",
        "email": "testyuser_editor2@mail.com",
        "url": "",
        "registered": "2019-02-11 03:32:16",
        "displayname": "testyuser_editor2",
        "firstname": "ruby",
        "lastname": "you",
        "nickname": "testyuser_editor2",
        "description": "",
        "capabilities": {
            "editor": true
        },
        "roles": "editor",
        "registration_id": "FBA22345234",
        "mobile": "20202020",
        "company_name": "AXA",
        "job_title": "developer",
        "birth": "02/06/2018",
        "gender": "F",
        "avatar": "https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.0-1/p80x80/20768225_1635625603115289" +
            "_7285246251964416661_n.jpg?_nc_cat=102&_nc_ht=scontent.ftpe8-4.fna&oh=6a835f7ae4" +
            "2936ef6c13c1f2e2c742a6&oe=5CC2DE17"
    }
}


export const ProfileUpdateMockResponse = {
    "status": "ok",
    "firstname": "testyuser_editor2",
    "lastname": "testyuser_editor2",
    "mobile": 12345
}