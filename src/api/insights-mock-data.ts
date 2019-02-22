import { TInsights } from "../model/types";

// Change to a data example I like
const weChatDataExample = {
    "category": "marriage",
    "authorName": "Ivy 氫盈美麗",
    "content": "愛心借杯的朋友分享",
    "profileImage" : "https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.0-1/p80x80/20768225_1635625603115289" +
            "_7285246251964416661_n.jpg?_nc_cat=102&_nc_ht=scontent.ftpe8-4.fna&oh=6a835f7ae4" +
            "2936ef6c13c1f2e2c742a6&oe=5CC2DE17",
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