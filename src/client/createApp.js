/**
 * createApp at client
 */
import * as _ from '../share/util'
import createMatcher from '../share/createMatcher'
import { defaultAppSettings } from '../share/constant'
import * as defaultViewEngine from './viewEngine'
import History from '../share/history'

export default function createApp(appSettings) {
    let finalAppSettings = _.extend({ viewEngine: defaultViewEngine }, defaultAppSettings)

    _.extend(finalAppSettings, appSettings)

    let {
        routes,
        viewEngine,
        loader,
        context,
        container,
    } = finalAppSettings

    let history = createHistory(finalAppSettings)
    let matcher = createMatcher(routes)
    let currentController = null
    let currentLocation = null
    let unlisten = null
    let finalContainer = null

    function getContainer() {
        if (finalContainer) {
            return finalContainer
        }
        if (typeof container === 'string') {
            return finalContainer = document.querySelector(container)
        } else {
            return finalContainer = container
        }
    }

    function render(targetPath) {
        let location = typeof targetPath === 'string' ? history.createLocation(targetPath) : targetPath

        if (currentLocation) {
            let isEqualPathname = currentLocation.pathname === location.pathname
            let isEqualSearch = currentLocation.search === location.search
            let isEqualHash = currentLocation.hash === location.hash
            if (isEqualPathname && isEqualSearch && isEqualHash) {
                return
            }
        }

        currentLocation = location

        let matches = matcher(location.pathname)

        if (!matches) {
            throw new Error(`Did not match any route with pathname:${location.pathname}`)
        }

        let { path, params, controller } = matches

        location.pattern = path
        location.params = params

        let controllerType = typeof controller
        let initController = createInitController(location)

        if (controllerType === 'string') {
            let result = loader(controller, initController, location)
            if (_.isThenable(result)) {
                return result.then(initController)
            } else {
                return result
            }
        }

        if (controllerType === 'function') {
            let result = controller(location, loader)
            if (_.isThenable(result)) {
                return result.then(initController)
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
                history.replace(targetPath)
            }
            goTo(targetPath) {
                if (super.goTo) {
                    super.goTo(targetPath)
                }
                history.push(targetPath)
            }
            goIndex(index) {
                if (super.goIndex) {
                    super.goIndex(index)
                }
                history.go(index)
            }
            goBack() {
                if (super.goBack) {
                    super.goBack()
                }
                history.goBack()
            }
            goForward() {
                if (super.goForward) {
                    super.goForward()
                }
                history.goForward()
            }

            // update view
            refreshView() {
                if (super.refreshView) {
                    super.refreshView()
                }
                return renderToContainer(this.render())
            }

            // get container node
            getContainer() {
                if (super.getContainer) {
                    super.getContainer()
                }
                return getContainer()
            }

            // clear container
            clearContainer() {
                if (super.clearContainer) {
                    super.clearContainer()
                }
                return clearContainer()
            }
        }
        controllers[pattern] = WrapperController
        return WrapperController
    }

    function createInitController(location) {
        return function initController(Controller) {
            if (currentLocation !== location) {
                return
            }
            if (currentController) {
                destroyController()
            }
            let FinalController = getController(location.pattern, Controller)
            let controller = currentController = new FinalController(location, context)
            let unlistenBeforeLeave = null
            let unlistenBeforeUnload = null

            if (controller.beforeLeave) {
                let beforeLeave = controller.beforeLeave.bind(controller)
                unlistenBeforeLeave = history.listenBefore(beforeLeave)
            }

            if (controller.beforeUnload) {
                let beforeUnload = controller.beforeUnload.bind(controller)
                unlistenBeforeUnload = history.listenBeforeUnload(beforeUnload)
            }

            controller.$unlisten = () => {
                if (unlistenBeforeLeave) {
                    unlistenBeforeLeave()
                    unlistenBeforeLeave = null
                }
                if (unlistenBeforeUnload) {
                    unlistenBeforeUnload()
                    unlistenBeforeUnload = null
                }
            }

            let component = controller.init()

            // if controller.init return false value, do nothing
            if (!component) {
                return null
            } else if (_.isThenable(component)) {
                return component.then(renderToContainer)
            } else {
                return renderToContainer(component)
            }
        }
    }

    function renderToContainer(component) {
        return viewEngine.render(component, getContainer())
    }

    function clearContainer() {
        if (viewEngine.clear) {
            return viewEngine.clear(getContainer())
        }
    }

    function destroyController() {
        if (currentController) {
            currentController.$unlisten()
            if (currentController.destroy) {
                currentController.destroy()
            }
            currentController = null
        }
        clearContainer()
    }

    function start(callback, shouldRenderWithCurrentLocation) {
        let listener = location => {
            let result = render(location)
            if (!callback) {
                return
            }
            if (_.isThenable(result)) {
                result.then(() => callback(location))
            } else {
                callback(location)
            }
        }
        unlisten = history.listen(listener)
        if (shouldRenderWithCurrentLocation !== false) {
            listener(history.getCurrentLocation())
        }
    }

    function stop() {
        if (unlisten) {
            unlisten()
            unlisten = null
        }
        destroyController()
    }

    return {
        start,
        stop,
        render,
        history,
    }

}

function createHistory(settings) {
    let create = History[settings.type]
    create = History.useBasename(create)
    create = History.useBeforeUnload(create)
    create = History.useQueries(create)
    return create(settings)
}
