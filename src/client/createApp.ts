/**
 * createApp at client
 */
import CreateHistoryMap, {
  useBasename,
  useBeforeUnload,
  useQueries,
  CreateHistory,
  NLWithBQ,
  NativeHistory,
  BLWithBQ
} from 'create-history'
import defaultViewEngine from './viewEngine'
import { createCache, createMap, ReqError } from '../share/util'
import createMatcher from '../share/createMatcher'
import defaultAppSettings from '../share/defaultSettings'
import createController from './createController'
import {
  CreateHistoryInCA,
  Settings,
  Matcher,
  Context,
  ControllerConstructor,
  Cache,
  ControllerCacheFunc,
  Matches,
  HistoryBaseLocation,
  HistoryNativeLocation,
  AppMap,
  ViewEngineRender,
  Listener,
  AppElement,
  Loader,
  Route,
  Controller,
  WrapController
} from '../share/type'
import {
  CreateApp,
  GetControllerByLocation,
  GetContainer,
  Render,
  InitController,
  CreateInitController,
  DestoryContainer,
  ClearContainer,
  Subscribe,
  Start,
  Stop,
  Publish,
  ClientController,
  ClientControllerConstructor
} from './type'

const createHistory: CreateHistoryInCA<ClientController> = (settings) => {
  let chInit: CreateHistory<'NORMAL'> = CreateHistoryMap[settings.type]
  if (settings.basename) {
    return useQueries(useBeforeUnload(useBasename(chInit)))(settings)
  }
  return useQueries(useBeforeUnload(chInit))(settings)
}

const createApp: CreateApp = (settings) => {
  let finalAppSettings: Settings<ClientController> = Object.assign({ viewEngine: defaultViewEngine }, defaultAppSettings)

  finalAppSettings = Object.assign(finalAppSettings, settings)

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
    ...settings.context,
  }

  let history = createHistory(finalAppSettings)
  let matcher: Matcher = createMatcher(routes || [])
  let currentController: ClientController | null = null
  let currentLocation: HistoryNativeLocation | null = null
  let unlisten: Function | null = null
  let finalContainer: HTMLElement | null = null

  let cache: Cache<ClientController> = createCache(cacheAmount)

  const saveControllerToCache: ControllerCacheFunc<ClientController> = (controller) => {
    cache.set(controller.location.raw, controller)
  }

  const getControllerFromCache: GetControllerByLocation = (location) => {
    return cache.get(location.raw)
  }

  const removeControllerFromCache: ControllerCacheFunc<ClientController> = (controller) => {
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
    let location: NLWithBQ = typeof targetPath === 'string' ? history.createLocation(targetPath) : targetPath
    context.prevLocation = currentLocation

    let matches = matcher(location.pathname)

    if (!matches) {
      throw new ReqError(`Did not match any route with pathname:${location.pathname}`, 404)
    }

    let { path, params, controller } = matches

    let finalLocation: HistoryNativeLocation = Object.assign({
      pattern: path,
      params,
      raw: location.pathname + location.search
    }, location)

    currentLocation = finalLocation

    let initController: InitController = createInitController(finalLocation)
    let iController: ControllerConstructor | Promise<ControllerConstructor> = loader(controller, finalLocation, context)

    if (Promise.resolve(iController) == iController) {
      return (<Promise<ControllerConstructor>>iController).then(initController)
    } else {
      return initController(<ControllerConstructor>iController)
    }
  }

  let controllers = createMap<ControllerConstructor, ClientControllerConstructor>()

  const wrapController: WrapController<Controller, ClientControllerConstructor> = (IController) => {
    if (controllers.has(IController)) {
      return controllers.get(IController)
    }
    // implement the controller's life-cycle and useful methods
    class WrapperController extends IController {
      location: HistoryNativeLocation
      context: Context
      history: NativeHistory<BLWithBQ, NLWithBQ>
      matcher: Matcher
      loader: Loader
      routes: Route[]
      constructor(location: HistoryNativeLocation, context: Context) {
        super(location, context)
        this.location = location
        this.context = context
        this.history = history
        this.matcher = matcher
        this.loader = loader
        this.routes = routes || []
      }
      // update view
      public refreshView(view = this.render()) {
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

    return WrapperController as ClientControllerConstructor
  }

  const createInitController: CreateInitController = (location) => {
    const initController: InitController = (iController) => {
      if (currentLocation !== location) {
        return
      }

      destroyController()

      let controller = currentController = getControllerFromCache(location)
      let element: AppElement | Promise<AppElement> = null

      if (!!controller) {
        if (controller.restore) {
          element = controller.restore(location, context)
        } else {
          element = controller.init()
        }
        controller.location = location
        controller.context = context
      } else {
        let FinalController = wrapController(iController as ControllerConstructor)
        controller = currentController = createController(FinalController, location, context)
        element = controller.init()
      }

      // if controller#init|restore return false value, do nothing
      if (element == null) {
        return null
      }

      if (Promise.resolve(element) == element) {
        return (element as Promise<AppElement>).then(result => {
          if (currentLocation !== location || result == null) {
            return null
          }
          return renderToContainer(result, controller)
        })
      }
      return renderToContainer(element as AppElement, controller)
    }
    return initController
  }

  const renderToContainer: ViewEngineRender<ClientController> = (element, controller) => {
    if (controller) {
      saveControllerToCache(controller)
    }

    if (!viewEngine) {
      return null as AppElement
    }

    return viewEngine.render(element, controller, getContainer()) as AppElement
  }

  const clearContainer: ClearContainer = () => {
    if (viewEngine && viewEngine.clear) {
      let container = getContainer()
      if (container) {
        return viewEngine.clear(container)
      }
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
    let listener: (location: NLWithBQ) => void = location => {
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
    let unsubscribe: Stop | null = null
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