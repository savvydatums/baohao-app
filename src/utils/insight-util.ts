import { ArchiveAPI } from "../api/ArchiveAPI";
import { sendGenericUpdateAlert } from "./alert-generic";
import { ResponseStatus } from "../api/Comms";

// insight list util
export const shortenContent = (translate, content, ensize: number, cnsize: number) => {
	if (!content) { return }
	const lang = translate.currentLang || translate.defaultLang
	let stringNumber = lang == 'en' ? ensize : cnsize
	return content.substring(0, stringNumber);
}

export const renderTimeStamp = (timestamp: number|string) => {
	const time = parseInt(timestamp + '000')
	return new Date(time).toDateString()
}

export const renderTimeStampInNumber = (timestamp : number) => {
	const time = parseInt(timestamp + '000')
	const year = new Date(time).getFullYear()
	const month = new Date(time).getMonth() + 1
	const date = new Date(time).getDate()
	const hour = new Date(time).getHours()
	const minutes = new Date(time).getMinutes()

	return `${year} ${month} ${date} | ${hour}.${minutes}`
}

export const starItem = (cookie, alertCtrl, translate, record_id, source, group, category, callback?) => {
	ArchiveAPI.archiveItem(cookie, record_id, source, group, category)
		.then((result: any) => {
			const isFail = result.status === ResponseStatus.ERROR
			sendGenericUpdateAlert(alertCtrl, translate, isFail)
			callback && setTimeout(() => callback(), 1000)
		}, error => {
			sendGenericUpdateAlert(alertCtrl, translate, true, error)
		});
}

export const unStarItem = (cookie, alertCtrl, translate, record_id, source, callback?) => {
	ArchiveAPI.unArchiveItem(cookie, record_id, source)
		.then((result: any) => {
			const isFail = result.status === ResponseStatus.ERROR
			sendGenericUpdateAlert(alertCtrl, translate, isFail)
			callback && setTimeout(() => callback(), 1000)
		}, error => {
			sendGenericUpdateAlert(alertCtrl, translate, true, error)
		});
}

export const trashItem = (cookie, alertCtrl, translate, record_id, source, group, category, callback?) => {
	ArchiveAPI.trashItem(cookie, record_id, source, group, category)
		.then((result: any) => {
			const isFail = result.status === ResponseStatus.ERROR
			sendGenericUpdateAlert(alertCtrl, translate, isFail)
			callback && setTimeout(() => callback(), 1000)
		}, error => {
			sendGenericUpdateAlert(alertCtrl, translate, true, error)
		});
}