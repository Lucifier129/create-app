/**
 * createApp at client
 */
import * as History from 'create-history'
import defaultViewEngine from './viewEngine'
import * as _ from '../share/util'
import createMatcher, {
  Matcher,
  Matches,
  Route
} from '../share/createMatcher'
import {
  defaultAppSettings,
  Settings,
  Controller,
  ControllerConstructor,
  ClientInitController,
  createController,
  Location,
  ClientRender as Render,
  Context,
  CreateApp,
  ControllerCacheFunc,
  GetControllerByLocation,
  GetContainer,
  WrapController,
  CreateInitController,
  RenderToContainer,
  ClearContainer,
  DestoryContainer,
  Listener,
  Subscribe,
  Publish,
  Start,
  Stop,
  CreateHistory
} from '../share/constant'

const createHistory: CreateHistory = (settings) => {
  let historyCreater: History.CreateHistoryFunc = History[settings.type]
  if (settings.basename) {
    historyCreater = History.useBasename(historyCreater)
  }
  historyCreater = History.useBeforeUnload(historyCreater)
  historyCreater = History.useQueries(historyCreater)
  return historyCreater(settings)
}

const createApp: CreateApp = (appSettings) => {
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

  let history: History.NativeHistory = createHistory(finalAppSettings)
  let matcher: Matcher = createMatcher(routes)
  let currentController: Controller = null
  let currentLocation: History.Location = null
  let unlisten: Function = null
  let finalContainer: HTMLElement = null

  let cache: _.Cache<Controller> = _.createCache(cacheAmount)

  const saveControllerToCache: ControllerCacheFunc = (controller) => {
    cache.set(controller.location.raw, controller)
  }

  const getControllerFromCache: GetControllerByLocation = (location) => {
    return cache.get(location.raw)
  }

  const removeControllerFromCache: ControllerCacheFunc = (controller) => {
    cache.remove(controller.location.raw)
  }

  const getContainer: GetContainer = () => {
    if (finalContainer) {
      return finalContainer
    }
    if (typeof container === 'string') {
      return finalContainer = document.querySelector(container)
    } else {
      return finalContainer = container
    }
  }

  const render: Render = (targetPath) => {
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

    let initController: ClientInitController = createInitController(location)
    let iController: ControllerConstructor | Promise<ControllerConstructor> = loader(controller, location, context)

    if (_.isThenable(iController)) {
      return (<Promise<ControllerConstructor>>iController).then(initController)
    } else {
      return initController(<ControllerConstructor>iController)
    }
  }

  let controllers: _.AppMap<ControllerConstructor, Controller>
    = _.createMap<ControllerConstructor, Controller>()

  const wrapController: WrapController = (IController) => {
    if (controllers.has(IController)) {
      return controllers.get(IController)
    }
    // implement the controller's life-cycle and useful methods
    class WrapperController extends IController {
      constructor(location?: Location, context?: Context) {
        super(location, context)
        this.location = this.location || location
        this.context = this.context || context
        this.history = history
        this.matcher = matcher
        this.loader = loader
        this.routes = routes
      }
      // update view
      public refreshView(view = (this as Controller).render()) {
        renderToContainer(view, this)
      }
      // get container node
      public getContainer() {
        return getContainer()
      }
      // clear container
      public clearContainer() {
        clearContainer()
      }
      public saveToCache() {
        this.KeepAlive = true
        saveControllerToCache(this)
      }
      public removeFromCache() {
        this.KeepAlive = false
        removeControllerFromCache(this)
      }
      public getAllCache() {
        return cache.getAll()
      }
    }

    controllers.set(IController, WrapperController as Controller)

    return WrapperController
  }

  const createInitController: CreateInitController = (location) => {
    const initController: ClientInitController = (iController) => {
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
        let FinalController = wrapController(<ControllerConstructor>iController)
        controller = currentController = createController(FinalController, location, context)
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

  const renderToContainer: RenderToContainer = (component, controller) => {
    saveControllerToCache(controller)
    return viewEngine.render(component, getContainer(), controller)
  }

  const clearContainer: ClearContainer = () => {
    if (viewEngine.clear) {
      return viewEngine.clear(getContainer())
    }
  }

  const destroyController: DestoryContainer = () => {
    if (currentController && !currentController.KeepAlive) {
      removeControllerFromCache(currentController)
    }
    if (currentController && currentController.destroy) {
      currentController.destroy()
      currentController = null
    }
  }

  let listeners: Listener[] = []

  const subscribe: Subscribe = (listener) => {
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

  const publish: Publish = (location) => {
    for (let i = 0, len = listeners.length; i < len; i++) {
      listeners[i](location, history)
    }
  }

  const start: Start = (callback, shouldRenderWithCurrentLocation) => {
    let listener: (location: Location) => void = location => {
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

  const stop: Stop = () => {
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