/**
 * createApp at server
 */
import * as History from 'create-history'
import * as _ from '../share/util'
import defaultViewEngine from './viewEngine'
import createMatcher, {
  Matcher,
  Matches,
  Route,
} from '../share/createMatcher'
import {
  defaultAppSettings,
  Settings,
  Controller,
  Location,
  ServerRender as Render,
  Context,
  CreateApp,
  InitController,
  FetchController,
  WrapController,
  CreateHistory,
  RenderToString,
  ControllerConstructor,
  createController
} from '../share/constant'

const createHistory: CreateHistory = (settings) => {
  let create: History.CreateHistoryFunc = History.createMemoryHistory
  if (settings.basename) {
    create = History.useBasename(create)
  }
  create = History.useQueries(create)
  return create(settings)
}

const createApp: CreateApp = (appSettings) => {
  let finalAppSettings: Settings = _.extend({ viewEngine: defaultViewEngine }, defaultAppSettings)

  _.extend(finalAppSettings, appSettings)

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

  let matcher: Matcher = createMatcher(routes)
  let history: History.NativeHistory = createHistory(finalAppSettings)

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

    if (_.isThenable(result)) {
      if (callback) {
        result.then(result => callback(null, result), callback)
      }
      return result
    }
    callback && callback(null, result)
    return result
  }

  const initController: InitController = (controller) => {
    if (_.isThenable(controller)) {
      return (<Promise<Controller>>controller).then(initController)
    }
    let component = (<Controller>controller).init && (<Controller>controller).init()

    if (component === null) {
      return { controller }
    }

    if (_.isThenable(component)) {
      return (<Promise<{}>>component).then(component => {
        if (component == null) {
          return { controller }
        }
        let content = renderToString(component, controller as Controller)
        return { content, controller }
      })
    }
    let content = renderToString(component, controller as Controller)
    return { content, controller }
  }

  const fetchController: FetchController = (requestPath, injectContext) => {
    let location: Location = history.createLocation(requestPath)
    let matches: Matches = matcher(location.pathname)

    if (!matches) {
      let error = new Error(`Did not match any route with path:${requestPath}`)
      // @ts-ignore
      error.status = 404
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

    if (_.isThenable(iController)) {
      return (<Promise<ControllerConstructor>>iController).then(iController => {
        let Wrapper = wrapController(iController)
        return createController(Wrapper, location, finalContext)
      })
    }

    let Wrapper = wrapController(<ControllerConstructor>iController)
    return createController(Wrapper, location, finalContext)
  }


  let controllers: _.AppMap<ControllerConstructor, Controller>
    = _.createMap<ControllerConstructor, Controller>()

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

    controllers.set(iController, WrapperController as Controller)
    return WrapperController
  }

  const renderToString: RenderToString = (component, controller) => {
    return viewEngine.render(component, undefined, controller)
  }

  return {
    render,
    history,
  }
}
export default createApp
