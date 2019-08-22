/**
 * createApp at server
 */
import History from 'create-history'
import * as _ from '../share/util'
import defaultViewEngine from './viewEngine'
import createMatcher from '../share/createMatcher'
import defaultAppSettings from '../share/defaultSettings'
import createController from '../share/createController'
import CA from './index'

const createHistory: CA.CreateHistory = (settings) => {
  let create: History.CreateHistory = History.createMemoryHistory
  if (settings.basename) {
    create = History.useBasename(create)
  }
  create = History.useQueries(create)
  return create(settings)
}

const createApp: CA.CreateApp = <E>(appSettings) => {
  let finalAppSettings: CA.Settings = _.extend({ viewEngine: defaultViewEngine }, defaultAppSettings)

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

  let matcher: CA.Matcher = createMatcher(routes)
  let history: History.NativeHistory = createHistory(finalAppSettings)

  const render: CA.Render = (requestPath, injectContext, callback) => {
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

  const initController: CA.InitController = (controller: CA.Controller | Promise<CA.Controller>) => {
    if (_.isThenable(controller)) {
      return (<Promise<CA.Controller>>controller).then(initController)
    }
    let element: E | Promise<E> = (controller as CA.Controller).init && (controller as CA.Controller).init()

    if (element === null) {
      return { controller: controller as CA.Controller }
    }

    if (_.isThenable(element)) {
      return (<Promise<E>>element).then(element => {
        if (element == null) {
          return { controller: controller as CA.Controller }
        }
        let content: CA.AppElement = renderToString(element as E, controller as CA.Controller)
        return { content, controller: controller as CA.Controller }
      })
    }
    let content: CA.AppElement = renderToString(element as E, controller as CA.Controller)
    return { content, controller: controller as CA.Controller}
  }

  const fetchController: CA.FetchController = (requestPath, injectContext) => {
    let location: CA.Location = history.createLocation(requestPath)
    let matches: CA.Matches = matcher(location.pathname)

    if (!matches) {
      let error = new _.ReqError(`Did not match any route with path:${requestPath}`, 404)
      return Promise.reject(error)
    }

    let { path, params, controller } = matches

    location.pattern = path
    location.params = params
    location.raw = requestPath

    let finalContext: CA.Context = {
      ...context,
      ...injectContext,
    }
    let iController: CA.ControllerConstructor | Promise<CA.ControllerConstructor> = loader(controller, location, finalContext)

    if (_.isThenable(iController)) {
      return (<Promise<CA.ControllerConstructor>>iController).then(iController => {
        let Wrapper = wrapController(iController)
        return createController(Wrapper, location, finalContext)
      })
    }

    let Wrapper = wrapController(<CA.ControllerConstructor>iController)
    return createController(Wrapper, location, finalContext)
  }


  let controllers: CA.AppMap<CA.ControllerConstructor, CA.Controller>
    = _.createMap<CA.ControllerConstructor, CA.Controller>()

  const wrapController: CA.WrapController = (iController) => {
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

    controllers.set(iController, WrapperController as CA.Controller)
    return WrapperController
  }

  const renderToString: CA.RenderToString<E> = (element: E, controller?: CA.Controller) => {
    return (viewEngine.render as CA.ViewEngineRender<E>)(element, undefined, controller)
  }

  return {
    render,
    history,
  }
}
export default createApp
