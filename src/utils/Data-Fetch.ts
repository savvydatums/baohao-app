
export const fetchCompaniesFromLocale = (currentLang, defaultLang, translations) => {
    const lang = currentLang || defaultLang
    const companies = translations[lang]['PROFILE']['COMPANIES']
    const output = Object.keys(companies).map(key => ({ key, name: companies[key] }));
    return output
}

export const getTicketInfo = (ticketInfo) => {
	var regex = /'>(.*?)</g;
	var found = ticketInfo.match(regex);
	return found[1].replace('\'>', '').replace('<', '')
}

export const getGroupTitleByKey = (translate, key) => {
	const lang = translate.currentLang || translate.defaultLang
	return translate.translations[lang].INSIGHT.GROUP[key]
}

export const getTranslation = (translate, keyString) => {

	const translateKeys = keyString.split(".");
	const lang = translate.currentLang || translate.defaultLang
	const translations = translate.translations[lang]
	let currentObj = translations
	let finalInfo = null

	const filter = (translateSection) => {
		for (let key in translateSection) {
			if (key == translateKeys[0]) {
				if (translateKeys.length > 1) {
					translateKeys.shift();
					filter(translateSection[key])
				} else {
					finalInfo = translateSection[key]
				}
			}
		}
	}

	filter(currentObj)

	return finalInfo
}