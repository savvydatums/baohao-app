
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