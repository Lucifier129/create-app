/**
 * createApp at server
 */
import * as _ from '../share/util'
import createMatcher from '../share/createMatcher'
import { defaultAppSettings } from '../share/constant'
import * as defaultViewEngine from './viewEngine'
import History from '../share/history'
import createMemoryHistory from 'create-history/lib/createMemoryHistory'

export default function createApp(appSettings) {
    let finalAppSettings = _.extend({ viewEngine: defaultViewEngine }, defaultAppSettings)

    _.extend(finalAppSettings, appSettings)

    let {
        routes,
        viewEngine,
        loader,
        context,
    } = finalAppSettings

    let matcher = createMatcher(routes)
    let history = createHistory(finalAppSettings)

    function render(requestPath, callback) {
        let location = history.createLocation(requestPath)
        let matches = matcher(location.pathname)

        if (!matches) {
            let error = new Error(`Did not match any route with path:${requestPath}`)
            callback && callback(error)
            return Promise.reject(error)
        }

        let { path, params, controller } = matches

        location.pattern = path
        location.params = params

        let initController = createInitController(location, callback)
        let controllerType = typeof controller

        let Controller = null

        if (controllerType === 'string') {
            Controller = loader(controller, location)
        } else if (controllerType === 'function') {
            Controller = controller(location, loader)
        } else {
            throw new Error('controller must be string or function')
        }

        if (_.isThenable(Controller)) {
            return Controller.then(initController)
        } else {
            return initController(Controller)
        }
    }

    let controllers = {}

    function getController(pattern, Controller) {
        if (controllers.hasOwnProperty(pattern)) {
            return controllers[pattern]
        }

        // implement the controller's life-cycle and useful methods
        class WrapperController extends Controller {
            constructor(location, context) {
                    super(location, context)
                    this.location = this.location || location
                    this.context = this.context || context
                }
                // history apis
            goReplace(targetPath) {
                return render(targetPath)
            }
            goTo(targetPath) {
                return render(targetPath)
            }
        }
        controllers[pattern] = WrapperController
        return WrapperController
    }

    function createInitController(location, callback) {
        return function initController(Controller) {
            let FinalController = getController(location.pattern, Controller)
            let controller = new FinalController(location, context)
            let component = controller.init()
            if (_.isThenable(component)) {
                let promise = component.then(renderToString)
                if (callback) {
                    promise.then(result => callback(null, result), callback)
                }
                return promise
            }

            let result = renderToString(component)
            if (callback) {
                callback(null, result)
            }
            return result
        }
    }

    function renderToString(component) {
        return viewEngine.render(component)
    }

    function publicRender(requestPath, callback) {
        try {
            return render(requestPath, callback)
        } catch (error) {
            callback && callback(error)
            return Promise.reject(error)
        }
    }

    return {
        render: publicRender,
        history,
    }
}


function createHistory(settings) {
    let create = createMemoryHistory
    create = History.useBasename(create)
    create = History.useQueries(create)
    return create(settings)
}
