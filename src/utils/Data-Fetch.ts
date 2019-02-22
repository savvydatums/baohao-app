
export const fetchCompaniesFromLocale = (currentLang, defaultLang, translations) => {
    const lang = currentLang || defaultLang
    const companies = translations[lang]['PROFILE']['COMPANIES']
    const output = Object.keys(companies).map(key => ({ key, name: companies[key] }));
    return output
}