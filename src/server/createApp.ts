/**
 * createApp at server
 */
import {
  useBasename,
  useQueries,
  CreateHistory,
  NativeHistory,
  createMemoryHistory
} from 'create-history'
import { createMap, ReqError } from '../share/util'
import defaultViewEngine from './viewEngine'
import createMatcher from '../share/createMatcher'
import defaultAppSettings from '../share/defaultSettings'
import createController from '../share/createController'
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
  AppElement
} from '../share/type'
import {
  CreateApp,
  Render,
  InitController,
  CreateInitController,
  FetchController,
  RenderToString
} from './type'

const createHistory: CreateHistoryInCA = (settings) => {
  let chInit: CreateHistory<'NORMAL'> = createMemoryHistory
  if (settings.basename) {
    return useQueries(useBasename(chInit))(settings)
  }
  return useQueries(chInit)(settings)
}

const createApp: CreateApp = <C>(appSettings) => {
  let finalAppSettings: Settings = Object.assign({ viewEngine: defaultViewEngine }, defaultAppSettings)

  Object.assign(finalAppSettings, appSettings)

  let {
    routes,
    viewEngine,
    loader,
    context
  } = finalAppSettings

  context = {
    ...finalAppSettings.context,
    ...appSettings.context,
  }

  let matcher = createMatcher(routes)
  let history = createHistory(finalAppSettings)

  const render: Render = (requestPath, injectContext, callback) => {
    let result = null

    if (typeof injectContext === 'function') {
      callback = injectContext
      injectContext = null
    }

    try {
      result = initController(fetchController(requestPath, injectContext))
    } catch (error) {
      callback && callback(error)
      return Promise.reject(error)
    }
    if (Promise.resolve(result) == result) {
      if (callback) {
        result.then(result => callback(null, result), callback)
      }
      return result
    }
    callback && callback(null, result)
    return result
  }

  const initController: InitController = (controller: Controller | Promise<Controller>) => {
    if (Promise.resolve(controller) == controller) {
      return (<Promise<Controller>>controller).then(initController)
    }
    let component: C | Promise<C> = (controller as Controller).init()

    if (component === null) {
      return { controller: controller as Controller }
    }

    if (Promise.resolve(component) == component) {
      return (<Promise<C>>component).then(component => {
        if (component == null) {
          return { controller: controller as Controller }
        }
        let content: AppElement = renderToString(component as C, controller as Controller)
        return { content, controller: controller as Controller }
      })
    }
    let content: AppElement = renderToString(component as C, controller as Controller)
    return { content, controller: controller as Controller}
  }

  const fetchController: FetchController = (requestPath, injectContext) => {
    let location: HistoryNativeLocation = history.createLocation(requestPath)
    let matches: Matches = matcher(location.pathname)

    if (!matches) {
      let error = new ReqError(`Did not match any route with path:${requestPath}`, 404)
      return Promise.reject(error)
    }

    let { path, params, controller } = matches

    location.pattern = path
    location.params = params
    location.raw = requestPath

    let finalContext: Context = {
      ...context,
      ...injectContext,
    }
    let iController: ControllerConstructor | Promise<ControllerConstructor> = loader(controller, location, finalContext)

    if (Promise.resolve(iController) == iController) {
      return (<Promise<ControllerConstructor>>iController).then(iController => {
        let Wrapper = wrapController(iController)
        return createController(Wrapper, location, finalContext)
      })
    }

    let Wrapper = wrapController(<ControllerConstructor>iController)
    return createController(Wrapper, location, finalContext)
  }


  let controllers: AppMap<ControllerConstructor, ControllerConstructor>
    = createMap<ControllerConstructor, ControllerConstructor>()

  const wrapController: WrapController = (iController) => {
    if (controllers.has(iController)) {
      return controllers.get(iController)
    }

    // implement the controller's life-cycle and useful methods
    class WrapperController extends iController {
      constructor(location, context) {
        super(location, context)
        this.location = this.location || location
        this.context = this.context || context
        this.matcher = matcher
        this.loader = loader
        this.routes = routes
      }
    }

    controllers.set(iController, WrapperController)
    return WrapperController
  }

  const renderToString: RenderToString<C> = (component: C, controller?: Controller) => {
    return (viewEngine.render as ViewEngineRender<C>)(component, controller)
  }

  return {
    render,
    history,
  }
}
export default createApp
