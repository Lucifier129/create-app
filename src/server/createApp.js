/**
 * createApp at server
 */
import * as _ from '../share/util'
import createMatcher from '../share/createMatcher'
import { defaultAppSettings } from '../share/constant'
import * as defaultViewEngine from './viewEngine'
import url from 'url'
import querystring from 'querystring'

export default function createApp(appSettings) {
    let finalAppSettings = _.extends({ viewEngine: defaultViewEngine }, defaultAppSettings, appSettings)

    let {
        routes,
        viewEngine,
        loader,
        context,
        basename,
    } = finalAppSettings

    let matcher = createMatcher(routes)
    let BASENAME_RE = new RegExp(`^${basename}`, 'i')
    let currentLocation = null

    let historyAPI = {
        goReplace: render,
        goTo: render,
        goIndex: _.noop,
        goBack: _.noop,
        goForward: _.noop,
    }

    function getPathname(pathname) {
        return pathname.replace(BASENAME_RE, '')
    }

    function getLocation() {
        return currentLocation
    }

    function render(requestPath) {
    	let finalPath = getPathname(requestPath)
    	let urlObj = url.parse(requestPath)
		let query = urlObj.query ? querystring.parse(urlObj.query) : {}
		let finalLocation = {
			originalUrl: requestPath,
			pathname: urlObj.pathname,
			search: urlObj.search || '',
			query: query,
			basename: basename,
		}
        let matches = matchPathname(finalLocation.pathname)

        if (!matches) {
            throw new Error(`Did not match any route with path:${requestPath}`)
        }

        let { params, controller } = matches
        let controllerType = typeof controller

        finalLocation.params = params
        currentLocation = finalLocation

        // handle path string
        if (controllerType === 'string') {
            let result = loader(controller, initController)
            if (_.isThenable(result)) {
                return result.then(initController)
            } else {
                return result
            }
        }

        // handle factory function
        if (controllerType === 'function') {
            let result = controller(finalLocation)
            if (_.isThenable(result)) {
                return result.then(initController)
            } else {
                return initController(result)
            }
        }
    }

    function initController(Controller) {
        let controller = new Controller(context)

        controller.getLocation = getLocation
        _.extend(controller, historyAPI)

        let component = controller.init()

        if (_.isThenable(component)) {
            return component.then(renderToString)
        } else {
            return renderToString(component)
        }
    }

    function renderToString(component) {
        return viewEngine.render(component)
    }

    return {
    	render
    }
}
