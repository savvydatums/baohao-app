export const baseApiPath = 'https://baoheuat.eastasia.cloudapp.azure.com/wordpress/index.php/'
export const authPath = `${baseApiPath}api/auth/`

// form submission (group registration)
export const groupReserve = `${baseApiPath}wp-json/gf/v2/forms/2/submissions`
export const individualReserve = `${baseApiPath}wp-json/gf/v2/forms/1/submissions`

// register new Users
export const register = `${baseApiPath}wp-json/wp/v2/users/register`

// authentication
export const login = `${authPath}generate_auth_cookie`
export const getUserInfo = `${authPath}get_currentuserinfo`
export const updateUserInfo = `${authPath}update_user`
export const resetPassword = `${authPath}reset_password`