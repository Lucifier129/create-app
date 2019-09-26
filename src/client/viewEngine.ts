/**
 * default view engine for client
 */
import { ViewEngineRender, ViewEngine } from '../share/type'
import { MidController } from './type'

const render: ViewEngineRender<MidController> = (html, controller, container) => {
	if (container) {
		container.innerHTML = html as string
	} else {
		throw new Error(`container is null`)
	}
	return container
}

const viewEngine: ViewEngine<MidController> = {
	render
}

export default viewEngine