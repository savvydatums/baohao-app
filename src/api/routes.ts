export const baseApiPath = 'https://api.myinsurbox.com/index.php/'
const authPath = `${baseApiPath}api/auth/`

// form submission (group registration)
export const groupReserve = `${baseApiPath}wp-json/gf/v2/forms/2/submissions`
export const individualReserve = `${baseApiPath}wp-json/gf/v2/forms/1/submissions`

// register new Users
export const register = `${baseApiPath}wp-json/wp/v2/users/register`
export const inAppPurchase = `${authPath}in_app_purchase` // not really use anymore

// authentication
export const login = `${authPath}generate_auth_cookie`
export const getUserInfo = `${authPath}get_currentuserinfo`
export const updateUserInfo = `${authPath}update_user`
export const resetPassword = `${authPath}reset_password`
export const forgetPassword = `${baseApiPath}api/forgot_password/forgot_password`
export const logout = `${baseApiPath}api/logout_user/logout_user`

// insights
const insightPath = `${baseApiPath}api/es/`
export const groupInsight = `${insightPath}get_group_insight` // onlyarchive, no trash(default)
export const insightByAuthorId = `${insightPath}get_insight_by_authorid`
export const insightTotalAmount = `${insightPath}get_group_total_amount`// not use
export const editUserPreference = `${insightPath}edit_customer_profile`
export const totalAmountByAuthorId = `${insightPath}get_total_amount_by_authorid`
export const potentialInsight = `${insightPath}get_potential_insight` //[onlyarchive || notrash]
export const productLinks = `${baseApiPath}api/suggest_product_link/get_product_link`
export const suggestionUseful = `${insightPath}useful`
export const recuritUsers = `${insightPath}get_recruitment_user`
export const recuritUserDetails = `${insightPath}get_recruitment_user_detail`

// archives
export const archiveList = `${insightPath}get_star_list`
export const advertList = `${insightPath}get_advertising`
export const archiveItem = `${insightPath}star`
export const unArchiveItem = `${insightPath}remove_star`
export const trashItem = `${insightPath}trash`

// trash
export const trashList = `${insightPath}get_trash_list`
export const unTrashItem = `${insightPath}remove_trash`
export const deleteTrashItem = `${insightPath}delete`

// posts
const infoPath = `${baseApiPath}api/info_page/`
export const postList = `${infoPath}get_posts`
export const postCategory = `${infoPath}get_posts_category`