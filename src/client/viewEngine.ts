/**
 * default view engine for client
 */
import { ViewEngineRender, ViewEngine } from '../share/type'
import { ClientController } from './type'

const render: ViewEngineRender<ClientController> = (html, controller, container) => {
	if (container) {
		container.innerHTML = html as string
	} else {
		throw new Error(`container is null`)
	}
	return container
}

const viewEngine: ViewEngine<ClientController> = {
	render
}

export default viewEngine