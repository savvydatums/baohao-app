import { getTranslation } from "./Data-Fetch";


export const sendGenericUpdateAlert = (alertCtrl, translate, isFail, info?) => {

	const successString = getTranslation(translate, 'UPDATE_SUCCEED')
	const title = isFail ? getTranslation(translate, 'UPDATE_FAILED') : successString
	let message = isFail ? (info || getTranslation(translate, 'UPDATE_PENDING_MESSAGE')) : successString

	if (message === title) {message = ''}

	const alert = alertCtrl.create({
		title: title,
		message: message,
		buttons: [{
			text: getTranslation(translate, 'GLOBA_CANCEL_BUTTON_LABEL')
		}]
	})

	alert.present()
}