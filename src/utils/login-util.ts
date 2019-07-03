import { LoginPage } from "../pages/login/login";


export const redirectIfNotLogin = (navCtrl, profile) => {
    if (!profile.registration_id || !profile.cookie) {
        navCtrl.push(LoginPage)
    }
}