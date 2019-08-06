/**
 * createApp at client
 */
import * as _ from '../share/util'
import createMatcher, { Matcher } from '../share/createMatcher'
import { defaultAppSettings, Settings, ViewEngine } from '../share/constant'
import * as defaultViewEngine from './viewEngine'
import * as History from 'create-history'

export default function createApp(appSettings) {
  let finalAppSettings: Settings = _.extend({ viewEngine: defaultViewEngine }, defaultAppSettings)

  _.extend(finalAppSettings, appSettings)

  let {
    routes,
    viewEngine,
    loader,
    context,
    container,
    cacheAmount,
  } = finalAppSettings

  context = {
    ...finalAppSettings.context,
    ...appSettings.context,
  }

  let history = createHistory(finalAppSettings)
  let matcher: Matcher = createMatcher(routes)
  let currentController = null
  let currentLocation = null
  let unlisten = null
  let finalContainer = null


  let cache = _.createCache(cacheAmount)

  function saveControllerToCache(controller) {
    cache.set(controller.location.raw, controller)
  }

  function getControllerFromCache(location) {
    return cache.get(location.raw)
  }

  function removeControllerFromCache(controller) {
    cache.remove(controller.location.raw)
  }

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
    context.prevLocation = currentLocation
    currentLocation = location

    let matches = matcher(location.pathname)

    if (!matches) {
      let error = new Error(`Did not match any route with pathname:${location.pathname}`)
      error.status = 404
      throw error
    }

    let { path, params, controller } = matches

    location.pattern = path
    location.params = params
    location.raw = location.pathname + location.search

    let initController = createInitController(location)
    let Controller = loader(controller, location, context)

    if (_.isThenable(Controller)) {
      return Controller.then(initController)
    } else {
      return initController(Controller)
    }
  }

  let controllers = _.createMap()

  function wrapController(Controller) {
    if (controllers.has(Controller)) {
      return controllers.get(Controller)
    }
    // implement the controller's life-cycle and useful methods
    class WrapperController extends Controller {
      constructor(location, context) {
        super(location, context)
        this.location = this.location || location
        this.context = this.context || context
        this.history = history
        this.matcher = matcher
        this.loader = loader
        this.routes = routes
      }
      // update view
      refreshView(view = this.render()) {
        renderToContainer(view, this)
      }
      // get container node
      getContainer() {
        return getContainer()
      }
      // clear container
      clearContainer() {
        clearContainer()
      }
      saveToCache() {
        this.KeepAlive = true
        saveControllerToCache(this)
      }
      removeFromCache() {
        this.KeepAlive = false
        removeControllerFromCache(this)
      }
      getAllCache() {
        return cache.getAll()
      }
    }

    controllers.set(Controller, WrapperController)

    return WrapperController
  }

  function createInitController(location) {
    return function initController(Controller) {
      if (currentLocation !== location) {
        return
      }

      destroyController()

      let controller = currentController = getControllerFromCache(location)
      let component = null

      if (controller) {
        component = controller.restore(location, context)
        controller.location = location
        controller.context = context

      } else {
        let FinalController = wrapController(Controller)
        controller = currentController = new FinalController(location, context)
        component = controller.init()
      }

      // if controller#init|restore return false value, do nothing
      if (component == null) {
        return null
      }

      if (_.isThenable(component)) {
        return component.then(result => {
          if (currentLocation !== location || result == null) {
            return null
          }
          return renderToContainer(result, controller)
        })
      }
      return renderToContainer(component, controller)
    }
  }

  function renderToContainer(component, controller) {
    saveControllerToCache(controller)
    return viewEngine.render(component, getContainer(), controller)
  }

  function clearContainer() {
    if (viewEngine.clear) {
      return viewEngine.clear(getContainer())
    }
  }

  function destroyController() {
    if (currentController && !currentController.KeepAlive) {
      removeControllerFromCache(currentController)
    }
    if (currentController && currentController.destroy) {
      currentController.destroy()
      currentController = null
    }
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
  let historyCreater = History[settings.type]
  if (settings.basename) {
    historyCreater = History.useBasename(historyCreater)
  }
  historyCreater = History.useBeforeUnload(historyCreater)
  historyCreater = History.useQueries(historyCreater)
  return historyCreater(settings)
}
