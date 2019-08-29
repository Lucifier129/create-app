/**
 * createApp at client
 */
import History, { Location } from 'create-history'
import defaultViewEngine from './viewEngine'
import * as _ from '../share/util'
import createMatcher from '../share/createMatcher'
import defaultAppSettings from '../share/defaultSettings'
import createController from '../share/createController'
import CA from './index'

const createHistory: CA.CreateHistory = (settings) => {
  let historyCreater: History.CreateHistory = History[settings.type]
  if (settings.basename) {
    historyCreater = History.useBasename(historyCreater)
  }
  historyCreater = History.useBeforeUnload(historyCreater)
  historyCreater = History.useQueries(historyCreater)
  return historyCreater(settings)
}

const createApp: CA.CreateApp = <C>(appSettings) => {
  let finalAppSettings: CA.Settings = _.extend({ viewEngine: defaultViewEngine }, defaultAppSettings)
  console.log('client start')

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
  let matcher: CA.Matcher = createMatcher(routes)
  let currentController: CA.Controller = null
  let currentLocation: CA.Location = null
  let unlisten: Function = null
  let finalContainer: HTMLElement = null

  let cache: CA.Cache<CA.Controller> = _.createCache(cacheAmount)

  const saveControllerToCache: CA.ControllerCacheFunc = (controller) => {
    cache.set(controller.location.raw, controller)
  }

  const getControllerFromCache: CA.GetControllerByLocation = (location) => {
    return cache.get(location.raw)
  }

  const removeControllerFromCache: CA.ControllerCacheFunc = (controller) => {
    cache.remove(controller.location.raw)
  }

  const getContainer: CA.GetContainer = () => {
    if (finalContainer) {
      return finalContainer
    }
    if (typeof container === 'string') {
      return finalContainer = document.querySelector(container)
    } else {
      return finalContainer = container
    }
  }

  const render: CA.Render = (targetPath) => {
    let location: CA.Location = typeof targetPath === 'string' ? history.createLocation(targetPath) : targetPath
    context.prevLocation = currentLocation
    currentLocation = location

    let matches: CA.Matches = matcher(location.pathname)

    if (!matches) {
      let error = new _.ReqError(`Did not match any route with pathname:${location.pathname}`, 404)
      throw error
    }

    let { path, params, controller } = matches

    location.pattern = path
    location.params = params
    location.raw = location.pathname + location.search

    let initController: CA.InitController = createInitController(location)
    let iController: CA.ControllerConstructor | Promise<CA.ControllerConstructor> = loader(controller, location, context)

    if (_.isThenable(iController)) {
      return (<Promise<CA.ControllerConstructor>>iController).then(initController)
    } else {
      return initController(<CA.ControllerConstructor>iController)
    }
  }

  let controllers: CA.AppMap<CA.ControllerConstructor, CA.ControllerConstructor>
    = _.createMap<CA.ControllerConstructor, CA.ControllerConstructor>()

  const wrapController: CA.WrapController = (IController) => {
    if (controllers.has(IController)) {
      return controllers.get(IController)
    }
    // implement the controller's life-cycle and useful methods
    class WrapperController extends IController {
      constructor(location?: CA.Location, context?: CA.Context) {
        super(location, context)
        this.location = this.location || location
        this.context = this.context || context
        this.history = history
        this.matcher = matcher
        this.loader = loader
        this.routes = routes
      }
      // update view
      public refreshView(view = (this as CA.Controller).render()) {
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

  const createInitController: CA.CreateInitController = (location) => {
    const initController: CA.InitController = (iController) => {
      if (currentLocation !== location) {
        return
      }

      destroyController()

      let controller: CA.Controller = currentController = getControllerFromCache(location)
      let component: C | Promise<C> = null

      if (controller) {
        component = controller.restore(location, context)
        controller.location = location
        controller.context = context

      } else {
        let FinalController = wrapController(<CA.ControllerConstructor>iController)
        controller = currentController = createController(FinalController, location, context)
        component = controller.init()
      }

      // if controller#init|restore return false value, do nothing
      if (component == null) {
        return null
      }

      if (_.isThenable(component)) {
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

  const renderToContainer: CA.RenderToContainer<C> = (component: C, controller?: CA.Controller) => {
    saveControllerToCache(controller)
    return (viewEngine.render as CA.ViewEngineRender<C>)(component, controller, getContainer())
  }

  const clearContainer: CA.ClearContainer = () => {
    if (viewEngine.clear) {
      return viewEngine.clear(getContainer())
    }
  }

  const destroyController: CA.DestoryContainer = () => {
    if (currentController && !currentController.KeepAlive) {
      removeControllerFromCache(currentController)
    }
    if (currentController && currentController.destroy) {
      currentController.destroy()
      currentController = null
    }
  }

  let listeners: CA.Listener[] = []

  const subscribe: CA.Subscribe = (listener) => {
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

  const publish: CA.Publish = (location) => {
    for (let i = 0, len = listeners.length; i < len; i++) {
      listeners[i](location, history)
    }
  }

  const start: CA.Start = (callback, shouldRenderWithCurrentLocation) => {
    let listener: (location: CA.Location) => void = location => {
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

  const stop: CA.Stop = () => {
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