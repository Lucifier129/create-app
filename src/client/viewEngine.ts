/**
 * default view engine for client
 */
import { ViewEngineRender, ViewEngine, AppElement } from '../share/type'

const render: ViewEngineRender = (html, controller, container) => {
	if (container) {
		container.innerHTML = html as string
	} else {
		throw new Error(`container is null`)
	}
	return container
}

const viewEngine: ViewEngine = {
	render
}

export default viewEngine