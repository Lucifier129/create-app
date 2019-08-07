/**
 * createApp at client
 */
import * as _ from '../share/util'
import createMatcher, { Matcher, Matches } from '../share/createMatcher'
import { defaultAppSettings, Settings, App, Controller, Location, Context } from '../share/constant'
import defaultViewEngine from './viewEngine'
import * as History from 'create-history'

const createHistory: (settings: Settings) => History.NativeHistory = (settings) => {
  let historyCreater: History.CreateHistoryFunc = History[settings.type]
  if (settings.basename) {
    historyCreater = History.useBasename(historyCreater)
  }
  historyCreater = History.useBeforeUnload(historyCreater)
  historyCreater = History.useQueries(historyCreater)
  return historyCreater(settings)
}

const createApp: (appSettings: Settings) => App = (appSettings) => {
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
  let currentController: Controller = null
  let currentLocation: History.Location = null
  let unlisten: Function = null
  let finalContainer: HTMLElement = null


  let cache: _.Cache<Controller> = _.createCache(cacheAmount)

  const saveControllerToCache: (controller: Controller) => void = (controller) => {
    cache.set(controller.location.raw, controller)
  }

  const getControllerFromCache: (location: Location) => Controller = (location) => {
    return cache.get(location.raw)
  }

  const removeControllerFromCache: (controller: Controller) => void = (controller) => {
    cache.remove(controller.location.raw)
  }

  const getContainer: () => HTMLElement = () => {
    if (finalContainer) {
      return finalContainer
    }
    if (typeof container === 'string') {
      return finalContainer = document.querySelector(container)
    } else {
      return finalContainer = container
    }
  }

  const render: (targetPath: string | Location) => any = (targetPath) => {
    let location: Location = typeof targetPath === 'string' ? history.createLocation(targetPath) : targetPath
    context.prevLocation = currentLocation
    currentLocation = location

    let matches: Matches = matcher(location.pathname)

    if (!matches) {
      let error = new Error(`Did not match any route with pathname:${location.pathname}`)
      // @ts-ignore
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

  let controllers: _.AppMap<Controller, typeof Controller>
    = _.createMap<Controller, typeof Controller>()

  const wrapController: (IController: Controller) => any = (IController) => {
    if (controllers.has(IController)) {
      return controllers.get(IController)
    }
    // implement the controller's life-cycle and useful methods
    class WrapperController extends Controller {
      location = undefined
      context = undefined
      history = undefined
      matcher = undefined
      loader = undefined
      routes = undefined
      KeepAlive = undefined
      constructor(location: Location, context: Context) {
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
      render: () => HTMLElement | React.ReactNode
    }

    controllers.set(IController, WrapperController)

    return WrapperController
  }

  const createInitController: (location: Location) => (constroller: Controller) => HTMLElement | React.ReactNode
  = (location) => {
     const initController: (constroller: Controller) => HTMLElement | React.ReactNode
     = (Controller) => {
      if (currentLocation !== location) {
        return
      }

      destroyController()

      let controller: Controller = currentController = getControllerFromCache(location)
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
    return initController
  }

  const renderToContainer: (component: HTMLElement | React.ReactNode | void, controller: Controller) => HTMLElement | React.ReactNode
  = (component, controller) => {
    saveControllerToCache(controller)
    return viewEngine.render(component, getContainer(), controller)
  }

  const clearContainer: () => void = () => {
    if (viewEngine.clear) {
      return viewEngine.clear(getContainer())
    }
  }

  const destroyController: () => void = () => {
    if (currentController && !currentController.KeepAlive) {
      removeControllerFromCache(currentController)
    }
    if (currentController && currentController.destroy) {
      currentController.destroy()
      currentController = null
    }
  }

  let listeners: Function[] = []

  const subscribe: (listener: Function) => () => void = (listener) => {
    let index: number = listeners.indexOf(listener)
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

  const publish: (location: Location) => void = (location) => {
    for (let i = 0, len = listeners.length; i < len; i++) {
      listeners[i](location, history)
    }
  }

  const start: (callback: Function, shouldRenderWithCurrentLocation: boolean) => () => void
  = (callback, shouldRenderWithCurrentLocation) => {
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
    let unsubscribe: () => void
    if (typeof callback === 'function') {
      unsubscribe = subscribe(callback)
    }
    if (shouldRenderWithCurrentLocation !== false) {
      listener(history.getCurrentLocation())
    }
    return unsubscribe
  }

  const stop: () => void = () => {
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

export default createApp