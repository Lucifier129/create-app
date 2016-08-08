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
            callback(new Error(`Did not match any route with path:${requestPath}`))
            return
        }

        let { path, params, controller } = matches

        location.pattern = path
        location.params = params

        let initController = createInitController(location, callback)
        let controllerType = typeof controller

        // handle path string
        if (controllerType === 'string') {
            let result = loader(controller, initController, location)
            if (_.isThenable(result)) {
                return result.then(initController, callback)
            } else {
                return result
            }
        }

        // handle factory function
        if (controllerType === 'function') {
            let result = controller(location, loader)
            if (_.isThenable(result)) {
                return result.then(initController, callback)
            } else {
                return initController(result)
            }
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
                if (super.goReplace) {
                    super.goReplace(targetPath)
                }
                return render(targetPath)
            }
            goTo(targetPath) {
                if (super.goTo) {
                    super.goTo(targetPath)
                }
                return render(targetPath)
            }
            goIndex(index) {
                if (super.goIndex) {
                    super.goIndex(index)
                }
            }
            goBack() {
                if (super.goBack) {
                    super.goBack()
                }
            }
            goForward() {
                if (super.goForward) {
                    super.goForward()
                }
            }
            refreshView() {
                if (super.refreshView) {
                    super.refreshView()
                }
            }
            getContainer() {
                if (super.getContainer) {
                    super.getContainer()
                }
            }
            clearContainer() {
                if (super.clearContainer) {
                    super.clearContainer()
                }
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
                    return promise
                        .then(result => callback(null, result), callback)
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
            callback(error)
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
