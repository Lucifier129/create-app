/**
 * default view engine for client
 */
import { ViewEngineRender, ViewEngine } from '../share/type'

const render: ViewEngineRender<string> = (html, controller, container) => {
	container.innerHTML = html
	return container
}

const viewEngine: ViewEngine = {
	render
}

export default viewEngine