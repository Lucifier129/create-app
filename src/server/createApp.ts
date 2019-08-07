/**
 * createApp at server
 */
import * as _ from '../share/util'
import createMatcher, { Matcher, Matches } from '../share/createMatcher'
import { defaultAppSettings, Settings, App, Controller, Location, Context } from '../share/constant';
import * as defaultViewEngine from './viewEngine'
import History, { createMemoryHistory } from 'create-history'

const createHistory: (settings: Settings) => History.NativeHistory = (settings) => {
  let create: History.CreateHistoryFunc = createMemoryHistory
  if (settings.basename) {
    create = History.useBasename(create)
  }
  create = History.useQueries(create)
  return create(settings)
}

const createApp: (appSettings: Settings) => App = (appSettings) => {
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

  const render: (requestPath, injectContext, callback) => any
  = (requestPath, injectContext, callback) => {
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

  const initController: (controller: Controller | Promise<Controller>) => any = (controller) => {
    if (_.isThenable(controller)) {
      return (<Promise<Controller>>controller).then(initController)
    }
    let component = (<Controller>controller).init()

    if (component == null) {
      return { controller }
    }

    if (_.isThenable(component)) {
      return component.then(component => {
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

  const fetchController = (requestPath, injectContext) => {
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
    let Controller = loader(controller, location, finalContext)

    if (_.isThenable(Controller)) {
      return Controller.then(Controller => {
        let Wrapper = wrapController(Controller)
        return new Wrapper(location, finalContext)
      })
    }

    let Wrapper = wrapController(Controller)
    return new Wrapper(location, finalContext)
  }


  let controllers: _.AppMap<Controller, typeof Controller>
    = _.createMap<Controller, typeof Controller>()

  const wrapController: (iController: Controller) => typeof Controller = (iController) => {
    if (controllers.has(iController)) {
      return controllers.get(iController)
    }

    // implement the controller's life-cycle and useful methods
    class WrapperController extends Controller {
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

  const renderToString: (
    component: HTMLElement | React.ReactNode | void,
    controller: Controller
  ) => React.ReactNode | HTMLElement
  = (component, controller) => {
    return viewEngine.render(component, undefined, controller)
  }

  return {
    render,
    history,
  }
}
export default createApp
