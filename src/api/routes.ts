export const baseApiPath = 'https://baoheapi.tk/wordpress/index.php/'
//export const baseApiPath = 'https://13.70.23.104/wordpress/index.php/'
const authPath = `${baseApiPath}api/auth/`

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
export const forgetPassword = `${baseApiPath}api/forgot_password/forgot_password`
export const logout = `${baseApiPath}api/logout_user/logout_user`

// insights
const insightPath = `${baseApiPath}api/es/`
export const groupInsight = `${insightPath}get_group_insight`
export const insightSummary = `${insightPath}get_insight_summary`
export const insightByAuthorId = `${insightPath}get_insight_by_authorid`
export const insightTotalAmount = `${insightPath}get_group_total_amount`
