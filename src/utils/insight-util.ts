import { ArchiveAPI } from "../api/ArchiveAPI";
import { sendGenericUpdateAlert, sendGenericToastMessage } from "./alert-generic";
import { ResponseStatus, InsightResponseStatus } from "../api/Comms";
import { keywordsSettings, insightType, insightFilterTypes } from "../pages/dashboard/insights/settings/settings"
import { InsightAPI } from "../api/InsightAPI";

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

export const starItem = (cookie, toastCtrl, translate, record_id, source, group, category, callback?) => {
	ArchiveAPI.archiveItem(cookie, record_id, source, group, category)
		.then((result: any) => {
			const isFail = result.status === ResponseStatus.ERROR
			sendGenericToastMessage(toastCtrl, translate, null, !isFail)
			callback && setTimeout(() => callback(), 1000)
		}, error => {
			sendGenericToastMessage(toastCtrl, translate, true, error)
		});
}

export const unStarItem = (cookie, toastCtrl, translate, record_id, source, callback?) => {
	ArchiveAPI.unArchiveItem(cookie, record_id, source)
		.then((result: any) => {
			const isFail = result.status === ResponseStatus.ERROR
			sendGenericToastMessage(toastCtrl, translate, null, !isFail)
			callback && setTimeout(() => callback(), 1000)
		}, error => {
			sendGenericToastMessage(toastCtrl, translate, true, error)
		});
}

export const trashItem = (cookie, toastCtrl, translate, record_id, source, group, category, callback?) => {
	ArchiveAPI.trashItem(cookie, record_id, source, group, category)
		.then((result: any) => {
			const isFail = result.status === ResponseStatus.ERROR
			sendGenericToastMessage(toastCtrl, translate, null, !isFail)
			callback && setTimeout(() => callback(), 1000)
		}, error => {
			sendGenericToastMessage(toastCtrl, translate, true, error)
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

export const assignPotentialToModal = (cookie, modal, errorCallback?) => {
	InsightAPI.getPotentialInsight(cookie, insightFilterTypes.all)
		.then((result:any) => {
			if (result.status == InsightResponseStatus.SUCCESS ||
				result.status == InsightResponseStatus.CREATED ||
				result.status == InsightResponseStatus.UPDATED) {
				modal.addData(result.results)
			} else {
				errorCallback && errorCallback(result.message);
			}
		}, error => {
			errorCallback && errorCallback(error);
		});
}

export const assignAdvertToModal = (cookie, modal, errorCallback?) => {
	InsightAPI.getPotentialInsight(cookie, insightFilterTypes.all)
		.then((result:any) => {
			if (result.status == InsightResponseStatus.SUCCESS ||
				result.status == InsightResponseStatus.CREATED ||
				result.status == InsightResponseStatus.UPDATED) {
				modal.addData(result.results)
			} else {
				errorCallback && errorCallback(result.message);
			}
		}, error => {
			errorCallback && errorCallback(error);
		});
}

export const assignClientInsightToModal = (cookie, modal, errorCallback?, filterType?) => {
	const filter = filterType ? filterType : insightFilterTypes.all

	InsightAPI.getAllClientInsight(cookie, filter)
		.then((result:any) => {
			if (result.status == InsightResponseStatus.SUCCESS ||
				result.status == InsightResponseStatus.CREATED ||
				result.status == InsightResponseStatus.UPDATED) {
				modal.addData(result.results)
			} else {
				errorCallback && errorCallback(result.message);
			}
		}, error => {
			errorCallback && errorCallback(error);
		});
}