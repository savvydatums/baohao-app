import { ArchiveAPI } from "../api/ArchiveAPI";
import { sendGenericUpdateAlert } from "./alert-generic";
import { InsightResponseStatus } from "../api/Comms";
import { keywordsSettings, insightType } from "../pages/dashboard/insights/settings/settings"

// insight list util
export const shortenContent = (translate, content, ensize: number, cnsize: number) => {
	if (!content) { return }
	const lang = translate.currentLang || translate.defaultLang
	let stringNumber = lang == 'en' ? ensize : cnsize
	return content.substring(0, stringNumber);
}

export const renderTimeStamp = (timestamp: number) => {
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

export const starItem = (cookie, alertCtrl, translate, record_id, source, group, category) => {
	ArchiveAPI.archiveItem(cookie, record_id, source, group, category)
		.then((result: any) => {
			const isFail = result.status !== InsightResponseStatus.UPDATED
			sendGenericUpdateAlert(alertCtrl, translate, isFail)
		}, error => {
			sendGenericUpdateAlert(alertCtrl, translate, true, error)
		});
}

export const trashItem = (cookie, alertCtrl, translate, record_id, source, group, category) => {
	ArchiveAPI.trashItem(cookie, record_id, source, group, category)
		.then((result: any) => {
			const isFail = result.status !== InsightResponseStatus.UPDATED
			sendGenericUpdateAlert(alertCtrl, translate, isFail)
		}, error => {
			sendGenericUpdateAlert(alertCtrl, translate, true, error)
		});
}

export const getKeywordInfo = (type, keyword) => {
	console.assert(type === insightType.all || type === insightType.potential)
	return keywordsSettings[type][keyword]
}

export const getKeywordText = (translate, type, keyword) => {
	const info = getKeywordInfo(type, keyword)
	const lang = translate.currentLang || translate.defaultLang
	return info[lang]
}