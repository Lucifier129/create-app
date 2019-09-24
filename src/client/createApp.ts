/**
 * createApp at client
 */
import {
  useBasename,
  useBeforeUnload,
  useQueries,
  CreateHistory,
  NativeHistory
} from 'create-history'
import defaultViewEngine from './viewEngine'
import { createCache, createMap, ReqError } from '../share/util'
import createMatcher from '../share/createMatcher'
import defaultAppSettings from '../share/defaultSettings'
import createController from '../share/createController'
import {
  CreateHistoryInCA,
  Settings,
  Matcher,
  Context,
  Controller,
  ControllerConstructor,
  Cache,
  ControllerCacheFunc,
  Matches,
  HistoryNativeLocation,
  AppMap,
  WrapController,
  ViewEngineRender,
  Listener
} from '../share/type'
import {
  CreateApp,
  GetControllerByLocation,
  GetContainer,
  Render,
  InitController,
  CreateInitController,
  RenderToContainer,
  DestoryContainer,
  ClearContainer,
  Subscribe,
  Start,
  Stop,
  Publish
} from './type'

const createHistory: CreateHistoryInCA = (settings) => {
  let chInit: CreateHistory<'NORMAL'> = History[settings.type]
  if (settings.basename) {
    return useQueries(useBeforeUnload(useBasename(chInit)))(settings)
  }
  return useQueries(useBeforeUnload(chInit))(settings)
}

const createApp: CreateApp = <C>(appSettings) => {
  let finalAppSettings: Settings = Object.assign({ viewEngine: defaultViewEngine }, defaultAppSettings)

  finalAppSettings = Object.assign(finalAppSettings, appSettings)

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
  let currentLocation: HistoryNativeLocation = null
  let unlisten: Function = null
  let finalContainer: HTMLElement = null

  let cache: Cache<Controller> = createCache(cacheAmount)

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
    let location: HistoryNativeLocation = typeof targetPath === 'string' ? history.createLocation(targetPath) : targetPath
    context.prevLocation = currentLocation
    currentLocation = location

    let matches: Matches = matcher(location.pathname)

    if (!matches) {
      let error = new ReqError(`Did not match any route with pathname:${location.pathname}`, 404)
      throw error
    }

    let { path, params, controller } = matches

    location.pattern = path
    location.params = params
    location.raw = location.pathname + location.search

    let initController: InitController = createInitController(location)
    let iController: ControllerConstructor | Promise<ControllerConstructor> = loader(controller, location, context)

    if (Promise.resolve(iController) == iController) {
      return (<Promise<ControllerConstructor>>iController).then(initController)
    } else {
      return initController(<ControllerConstructor>iController)
    }
  }

  let controllers: AppMap<ControllerConstructor, ControllerConstructor>
    = createMap<ControllerConstructor, ControllerConstructor>()

  const wrapController: WrapController = (IController) => {
    if (controllers.has(IController)) {
      return controllers.get(IController)
    }
    // implement the controller's life-cycle and useful methods
    class WrapperController extends IController {
      constructor(location?: HistoryNativeLocation, context?: Context) {
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

    controllers.set(IController, WrapperController)

    return WrapperController
  }

  const createInitController: CreateInitController = (location) => {
    const initController: InitController = (iController) => {
      if (currentLocation !== location) {
        return
      }

      destroyController()

      let controller: Controller = currentController = getControllerFromCache(location)
      let component: C | Promise<C> = null

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

      if (Promise.resolve(component) == component) {
        return (component as Promise<C>).then(result => {
          if (currentLocation !== location || result == null) {
            return null
          }
          return renderToContainer(result, controller)
        })
      }
      return renderToContainer(component as C, controller)
    }
    return initController
  }

  const renderToContainer: RenderToContainer<C> = (component: C, controller?: Controller) => {
    saveControllerToCache(controller)
    return (viewEngine.render as ViewEngineRender<C>)(component, controller, getContainer())
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
    let listener: (location: HistoryNativeLocation) => void = location => {
      let result = render(location)
      if (Promise.resolve(result) == result) {
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