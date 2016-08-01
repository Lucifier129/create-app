/**
 * default view engine for client
 */
export let render = (html, container) => {
	container.innerHTML = html
	return container
}