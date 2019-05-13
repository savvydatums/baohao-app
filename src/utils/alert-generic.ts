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
			title: translate.translations.CREATE_FAILED,
			message: message,
			buttons: [{
				text: translate.translations.GLOBAL_CANCEL_BUTTON_LABEL
			}]
		})

		alert.present()
	}

export const openEditNoteForNickName = (alertCtrl, translate, insightData, cookie) => {
	const alert = alertCtrl.create({
		title: 'Add a nick name',
		inputs: [{
			name: 'nickname',
			placeholder: 'nickname'
		}],
		buttons: [{
			text: 'cancel'
		},{
			text: 'save',
			handler: data => {
				console.log('data', data)
				InsightAPI.updateUserPreference(cookie, insightData.source, insightData.authorid, data.nickname)
					.then((result: any) => {
						const isFail = (result.status == ResponseStatus.ERROR)
						sendGenericUpdateAlert(alertCtrl, translate, isFail)
					}, error => {
						sendGenericUpdateAlert(alertCtrl, translate, true)
					})
			}
		}]
	})

	alert.present()
}