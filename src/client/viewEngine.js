/**
 * default view engine for client
 */
import { noop } from '../share/util'

export let render = (html, container) => {
	container.innerHTML = html
	return container
}