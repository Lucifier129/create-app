/**
 * default view engine for client
 */
import { ViewEngineRender, ViewEngine } from '../lib/type'
import { ClientController } from './type'

const render: ViewEngineRender<string, ClientController> = (html, controller, container) => {
	if (container) {
		container.innerHTML = html as string
	} else {
		throw new Error(`container is inexistent`)
	}
	return container
}

const viewEngine: ViewEngine<string, ClientController> = {
	render
}

export default viewEngine