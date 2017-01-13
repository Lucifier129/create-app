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
        basename = '',
    } = finalAppSettings

    let matcher = createMatcher(routes)
    let history = createHistory(finalAppSettings)

    function render(requestPath, injectContext, callback) {
        let result = null

        if (typeof injectContext === 'function') {
            callback = injectContext
            injectContext = null
        }

        try {
            result = initController(fetchController(requestPath, injectContext))
        } catch(error) {
            callback && callback(error)
            return Promise.reject(error)
        }
        
        if (_.isThenable(result)) {
            if (callback) {
                result.then(result => callback(null, result), callback)
            }
            return result
        }
        callback && callback(null, result)
        return result
    }

    function initController(controller) {
        if (_.isThenable(controller)) {
            return controller.then(initController)
        }
        let component = controller.init()
        if (_.isThenable(component)) {
            return component.then(component => {
                let content = renderToString(component)
                return { content, controller }
            })
        }
        let content = renderToString(component)
        return { content, controller }
    }

    function fetchController(requestPath, injectContext) {
        let location = history.createLocation(requestPath)
        let matches = matcher(location.pathname)

        if (!matches) {
            let error = new Error(`Did not match any route with path:${requestPath}`)
            return Promise.reject(error)
        }

        let { path, params, controller } = matches

        location.pattern = path
        location.params = params
        location.raw = requestPath

        let controllerType = typeof controller
        let Controller = loader(controller, location, context)
        let finalContext = {
            ...context,
            ...injectContext,
        }

        if (_.isThenable(Controller)) {
            return Controller.then(Controller => {
                let Wrapper = wrapController(location.pattern, Controller)
                return new Wrapper(location, finalContext)
            })
        }

        let Wrapper = wrapController(location.pattern, Controller)
        return new Wrapper(location, finalContext)
    }


    let controllers = {}

    function wrapController(pattern, Controller) {
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

            // history apis in server just redirect the url
            goTo(targetPath) {
                if (!_.isAbsoluteUrl(targetPath)) {
                    targetPath = basename + targetPath
                }
                let { redirect } = this.context
                if (redirect) {
                    redirect(targetPath)
                }
            }
            goReplace(targetPath) {
                if (!_.isAbsoluteUrl(targetPath)) {
                    targetPath = basename + targetPath
                }
                let { redirect } = this.context
                if (redirect) {
                    redirect(targetPath)
                }
            }
        }
        controllers[pattern] = WrapperController
        return WrapperController
    }

    function renderToString(component) {
        return viewEngine.render(component)
    }

    return {
        render,
        history,
    }
}


function createHistory(settings) {
    let create = createMemoryHistory
    create = History.useBasename(create)
    create = History.useQueries(create)
    return create(settings)
}
