/**
 * default view engine for client
 */
import CA from './index'

const render: CA.ViewEngineRender<string> = (html, controller, container) => {
	container.innerHTML = html
	return container
}

const viewEngine: CA.ViewEngine = {
	render
}

export default viewEngine