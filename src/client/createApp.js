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
                history.replace(targetPath)
            }
            goTo(targetPath) {
                history.push(targetPath)
            }
            goIndex(index) {
                history.go(index)
            }
            goBack() {
                history.goBack()
            }
            goForward() {
                history.goForward()
            }

            // update view
            refreshView() {
                renderToContainer(this.render())
            }

            // get container node
            getContainer() {
                return getContainer()
            }

            // clear container
            clearContainer() {
                clearContainer()
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
            destroyController()
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
        return viewEngine.render(component, getContainer(), currentLocation)
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

    let listeners = []

    function subscribe(listener) {
        let index = listeners.indexOf(listener)
        if (index === -1) {
            listeners.push(listener)
        }
        return () => {
            let index = listeners.indexOf(listener)
            if (index !== -1) {
                listeners = listeners.filter(fn => fn !== listener)
            }
        }
    }

    function publish(location) {
        for (let i = 0, len = listeners.length; i < len; i++) {
            listeners[i](location, history)
        }
    }

    function start(callback, shouldRenderWithCurrentLocation) {
        let listener = location => {
            let result = render(location)
            if (_.isThenable(result)) {
                result.then(() => {
                    publish(location)
                })
            } else {
                publish(location)
            }
        }
        unlisten = history.listen(listener)
        let unsubscribe
        if (typeof callback === 'function') {
            unsubscribe = subscribe(callback)
        }
        if (shouldRenderWithCurrentLocation !== false) {
            listener(history.getCurrentLocation())
        }
        return unsubscribe
    }

    function stop() {
        if (unlisten) {
            unlisten()
            destroyController()
            currentController = null
            currentLocation = null
            unlisten = null
            finalContainer = null
            listeners = []
        }
    }

    return {
        start,
        stop,
        render,
        history,
        subscribe,
    }

}

function createHistory(settings) {
    let create = History[settings.type]
    create = History.useBasename(create)
    create = History.useBeforeUnload(create)
    create = History.useQueries(create)
    return create(settings)
}
