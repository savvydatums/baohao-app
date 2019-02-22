export const baseApiPath = 'https://13.70.23.104/wordpress/index.php/'
export const authPath = `${baseApiPath}api/auth/`

// form submission (group registration)
export const groupReserve = `${baseApiPath}wp-json/gf/v2/forms/2/submissions`

// register new Users
export const register = `${baseApiPath}wp-json/wp/v2/users/register`

// authentication
export const login = `${authPath}generate_auth_cookie`
export const getUserInfo = `${authPath}get_currentuserinfo`
export const updateUserInfo = `${authPath}update_user`
export const resetPassword = `${authPath}reset_password`