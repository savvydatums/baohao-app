import URL from 'url'

export const isDebug = () => {
	const path = URL.parse(window.location.href, true)
	return path.query.debug
}