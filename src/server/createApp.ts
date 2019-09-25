/**
 * createApp at server
 */
import {
  useBasename,
  useQueries,
  CreateHistory,
  NativeHistory,
  createMemoryHistory,
  NLWithBQ
} from 'create-history'
import { createMap, ReqError } from '../share/util'
import defaultViewEngine from './viewEngine'
import createMatcher from '../share/createMatcher'
import defaultAppSettings from '../share/defaultSettings'
import createController from './createController'
import {
  CreateHistoryInCA,
  Settings,
  Context,
  Controller,
  ControllerConstructor,
  Matches,
  HistoryNativeLocation,
  AppMap,
  WrapController,
  ViewEngineRender,
  AppElement,
  Matcher,
  Loader,
  Route
} from '../share/type'
import {
  CreateApp,
  Render,
  InitController,
  CreateInitController,
  FetchController,
  InitControllerReturn,
  ServerController
} from './type'

const createHistory: CreateHistoryInCA = (settings) => {
  let chInit: CreateHistory<'NORMAL'> = createMemoryHistory
  if (settings.basename) {
    return useQueries(useBasename(chInit))(settings)
  }
  return useQueries(chInit)(settings)
}

const createApp: CreateApp = (settings: Partial<Settings>) => {
  let finalAppSettings: Settings = Object.assign({ viewEngine: defaultViewEngine }, defaultAppSettings)

  Object.assign(finalAppSettings, settings)

  let {
    routes,
    viewEngine,
    loader,
    context
  } = finalAppSettings

  context = {
    ...finalAppSettings.context,
    ...settings.context,
  }

  let matcher = createMatcher(routes || [])
  let history = createHistory(finalAppSettings)

  const render: Render = (requestPath, injectContext, callback) => {
    let result = null

    if (typeof injectContext === 'function') {
      callback = injectContext
      injectContext = null
    }

    try {
      let controller = fetchController(requestPath, injectContext)
      if (Promise.resolve(controller) == controller) {
        result = (<Promise<ServerController>>controller).then(initController)
      } else {
        result = initController(controller)
      }
    } catch (error) {
      callback && callback(error)
      return Promise.reject(error)
    }
    if (Promise.resolve(result) == result) {
      if (typeof callback !== 'undefined') {
        let cb: Function = callback
        result.then(result => cb(null, result), reason => cb(reason))
      }
      return result
    }
    callback && callback(null, result)
    return result
  }

  const initController: InitController = (controller: ServerController) => {
    let component: AppElement | Promise<AppElement> = (controller as ServerController).init()

    if (component === null) {
      return { controller: controller }
    }
    if (Promise.resolve(component) == component) {
      return component.then(component => {
        if (component == null) {
          return { controller: controller as ServerController }
        }
        return {
          content: renderToString(component, controller as ServerController),
          controller: controller as ServerController
        }
      }) as Promise<InitControllerReturn>
    }
    return {
      content: renderToString(component as AppElement, controller as ServerController),
      controller: controller as ServerController
    }
  }

  const fetchController: FetchController = (requestPath, injectContext) => {
    let location: NLWithBQ = history.createLocation(requestPath)
    let matches: Matches | null = matcher(location.pathname)

    if (!matches) {
      let error = new ReqError(`Did not match any route with path:${requestPath}`, 404)
      return Promise.reject(error)
    }

    let { path, params, controller } = matches

    let finalLocation: HistoryNativeLocation = Object.assign({
      pattern: path,
      params,
      raw: location.pathname + location.search
    }, location)

    let finalContext: Context = {
      ...context,
      ...injectContext,
    }
    let iController: ControllerConstructor | Promise<ControllerConstructor> = loader(controller, finalLocation, finalContext)

    if (Promise.resolve(iController) == iController) {
      return (<Promise<ControllerConstructor>>iController).then(iController => {
        let Wrapper = wrapController(iController)
        return createController(Wrapper, finalLocation, finalContext)
      })
    }

    let Wrapper = wrapController(<ControllerConstructor>iController)
    return createController(Wrapper, finalLocation, finalContext)
  }


  let controllers: AppMap<ControllerConstructor, ControllerConstructor<ServerController>>
    = createMap<ControllerConstructor, ControllerConstructor<ServerController>>()

  const wrapController: WrapController<ServerController> = (iController) => {
    if (controllers.has(iController)) {
      return controllers.get(iController)
    }

    // implement the controller's life-cycle and useful methods
    class WrapperController extends iController {
      location: HistoryNativeLocation
      context: Context
      matcher: Matcher
      loader: Loader
      routes: Route[]
      constructor(location: HistoryNativeLocation, context: Context) {
        super(location, context)
        this.location = location
        this.context = context
        this.matcher = matcher
        this.loader = loader
        this.routes = routes || []
      }
    }

    controllers.set(iController, WrapperController)
    return WrapperController
  }

  const renderToString: ViewEngineRender = (component: AppElement, controller?: Controller) => {
    if (!viewEngine) {
      return null
    }

    return viewEngine.render(component, controller)
  }

  return {
    render,
    history,
  }
}
export default createApp
