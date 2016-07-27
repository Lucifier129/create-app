/**
 * createApp at server
 */
import * as _ from '../share/util'
import createMatcher from '../share/createMatcher'

export default function createApp(appSettings) {
	let {
		routes,
		viewEngine,
		loader,
		context,
		basename,
	} = appSettings
	let matcher = createMatcher(routes)
	let BASENAME_RE = new RegExp(`^${basename}`, 'i')
	let currentLocation = null

	function matchPathname(pathname) {
		return matcher(pathname.replace(BASENAME_RE, ''))
	}

	function matchController($location) {
		let location = {
			...$location,
		}
		location.pathname = $location.pathname.replace(BASENAME_RE, '')
		let matches = matchPathname(location.pathname)
		if (!matches) {
			throw new Error(`Did not match any route with pathname:${location.pathname}`)
		}
		let { params, controller } = matches
		let controllerType = typeof controller
		let target = null

		location.params = params
		currentLocation = location

		if (controllerType === 'string') {
			return loader(controller, initController)
		}

		if (controllerType === 'function') {
			target = controller(location)
		}

		if (_.isThenable(target)) {
			return target.then(initController)
		} else {
			return initController(target)
		}
	}

	function initController(Controller) {
		let controller = new Controller(context)
		let component = controller.init(currentLocation)

		if (_.isThenable(component)) {
			return component.then(renderToString)
		} else {
			return renderToString(component)
		}
	}

	function renderToString(component) {
		return viewEngine.render(component)
	}

	return { matchController, matchPathname }
}