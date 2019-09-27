/**
 * default view engine for client
 */
import { ViewEngineRender, ViewEngine, AppElement } from '../lib/type'
import { ClientController } from './type'

const render: ViewEngineRender<AppElement, ClientController> = (html, controller, container) => {
	if (container) {
		container.innerHTML = html as string
	} else {
		throw new Error(`container is inexistent`)
	}
	return container
}

const viewEngine: ViewEngine<AppElement, ClientController> = {
	render
}

export default viewEngine