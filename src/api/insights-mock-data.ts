import { TInsights } from "../model/types";


export const insightsSummaryMockResponse = {
	status: 'ok',
	result: {
		medical: {
			categories: ["marriage", "sports"], // matched
			author: [{
				name: "xxxx",
				id: "xxxx"
			}],
			amount: 30,
			groupId: 1
		},
		savingAndLife: {
			categories: ["marriage", "sports"], // matched
			author: [{
				name: "xxxx",
				id: "xxxx"
			}],
			amount: 30,
			groupId: 1
		},
		investment: {
			categories: ["marriage", "sports"], // matched
			author: [{
				name: "xxxx",
				id: "xxxx"
			}],
			amount: 30,
			groupId: 1
		},
		general: {
			categories: ["marriage", "sports"], // matched
			author: [{
				name: "xxxx",
				id: "xxxx"
			}],
			amount: 30,
			groupId: 1
		}
	}
}


// Change to a data example I like
const weChatDataExample = {
	"categories": ["marriage", "sports"],
	"authorId": "xxxxxx",
    "authorName": "Ivy 氫盈美麗",
	"content": "愛心借杯的朋友分享",
	"likes": 30, //(number)
    "timestamp": 1540459113
}

// PAYLOAD: {
//  * cookie: string
//	* group: number
//  * }

export const insightCategoryMockResponse = {
	status: 'ok',
	results: []
}

/**
 * Get Data
 * METHOD: POST
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