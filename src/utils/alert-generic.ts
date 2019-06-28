import { getTranslation } from "./Data-Fetch";
import { InsightAPI } from "../api/InsightAPI";
import { ResponseStatus } from "../api/Comms";


export const sendGenericUpdateAlert = (alertCtrl, translate, isFail, info?) => {

	const successString = getTranslation(translate, 'UPDATE_SUCCEED')
	const title = isFail ? getTranslation(translate, 'UPDATE_FAILED') : successString
	let message = isFail ? (info || getTranslation(translate, 'UPDATE_PENDING_MESSAGE')) : successString

	if (message === title) {message = ''}

	const alert = alertCtrl.create({
		title: title,
		message: message,
		buttons: [{
			text: getTranslation(translate, 'GLOBA_OK_BUTTON_LABEL')
		}]
	})

	alert.present()
}

export const showError = (alertCtrl, translate, message) => {
		const alert = alertCtrl.create({
			title:  getTranslation(translate,'CREATE_FAILED'),
			message: message,
			buttons: [{
				text:  getTranslation(translate,'GLOBAL_CANCEL_BUTTON_LABEL')
			}]
		})

		alert.present()
	}

export const openEditNoteForNickName = (alertCtrl, translate, insightData, cookie, callback?) => {

	const alert = alertCtrl.create({
		title: getTranslation(translate, 'INSIGHT.ADD_NICKNAME'),
		inputs: [{
			name: 'nickname',
			placeholder: getTranslation(translate, 'INSIGHT.NICKNAME')
		}],
		buttons: [{
			text: getTranslation(translate, 'GLOBAL_CANCEL_BUTTON_LABEL')
		},{
			text: getTranslation(translate, 'GLOBAL_SAVE_LABEL'),
			handler: data => {
				InsightAPI.updateUserPreference(cookie, insightData.source, insightData.authorId, data.nickname)
					.then((result: any) => {
						const isFail = (result.status == ResponseStatus.ERROR)
						!isFail && callback && callback(data.nickname)
						sendGenericUpdateAlert(alertCtrl, translate, isFail)
					}, error => {
						sendGenericUpdateAlert(alertCtrl, translate, true)
					})
			}
		}]
	})

	alert.present()
}