/**
 * default view engine for client
 */
import { ViewEngine } from '../share/constant'
export const render: ViewEngine = (html, container) => {
	container.innerHTML = html
	return container
}