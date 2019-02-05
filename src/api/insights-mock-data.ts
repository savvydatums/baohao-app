import { TInsights } from "../model/types";

// can be any kind of exmple
const weChatDataExample = {
    "isCurrentUser": false,
    "snsId": "12922307643023237201",
    "authorName": "Ivy 氫盈美麗",
    "authorId": "wxid_8211092109922",
    "content": "愛心借杯的朋友分享",
    "profileImage" : "https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.0-1/p80x80/20768225_1635625603115289" +
            "_7285246251964416661_n.jpg?_nc_cat=102&_nc_ht=scontent.ftpe8-4.fna&oh=6a835f7ae4" +
            "2936ef6c13c1f2e2c742a6&oe=5CC2DE17",
    "comments": [
        {
            "isCurrentUser": false,
            "authorName": "Ivy 氫盈美麗",
            "authorId": "wxid_8211092109922",
            "content": "Namina是一位67歲的女士，使用氫杯後覺得很好，她一向都喜歡幫助別人，好東西要給別人分享，於是把氫杯借給健康有問題的朋友使用。\n\n其中一位有腎病人，飲氫水和吸氫二星期，指數由873下跌到800度，跌了70度，朋友立即購買。\n\n另一位是身體內有一個1.8cm的瘤，飲氫水和吸氫10日， 1.8cm的瘤變細到0.4cm ，太神奇了，這位朋友立即購買氫杯了。\n\nNamina就是把氫杯借給健康有問題的朋友使用，朋友健康有明顯好轉，於是亦購買氫杯，短時間內幫助了好多朋友都受惠！\n\n這個愛心借杯的方式，讓 Namina 直接或間接幫助朋友健康，並成功售出十多個氫杯。Namina現在更積極分享使用氫杯好產，從而幫助更多朋友改善健康    。\n"
        }
    ],
    "likes": [],
    "mediaList": [
        "http://mmsns.qpic.cn/mmsns/GEgXgy0tkLvVic1EPP4iaI6WzEvL98ibYI91e5z6fWN6QXo0iaj6NB1ztnrp1F80zD5WJatUrj35sRA/0",
        "http://mmsns.qpic.cn/mmsns/GEgXgy0tkLvVic1EPP4iaI6Y3wE4JEA8bo9AM9JErpz2D3Ehs5uLAm262UMJOuEQjja9hN4BwsB3E/0",
        "http://mmsns.qpic.cn/mmsns/GEgXgy0tkLvVic1EPP4iaI6Y3wE4JEA8bokZmVzz20E59KJzkkyhW9WxuiajuRvZAqFToxMbajzNuQ/0"
    ],
    "timestamp": 1540459113
}

/**
 * Get Data
 * METHOD: GET
 * PAYLOAD: {
 *    username:
 * }
*/

export const insightsMockResponse: TInsights = {
    result: {
        medical: [
            weChatDataExample, weChatDataExample, weChatDataExample
        ],
        savingAndLife: [
            weChatDataExample, weChatDataExample
        ],
        investment: [
            weChatDataExample, weChatDataExample, weChatDataExample
        ],
        general: [
            weChatDataExample, weChatDataExample
        ]
    },
    error: null
}