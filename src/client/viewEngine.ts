/**
 * default view engine for client
 */
import { ViewEngine } from '../share/constant'

const render = (html, container) => {
	container.innerHTML = html
	return container
}

const viewEngine: ViewEngine = {
	render
}

export default viewEngine