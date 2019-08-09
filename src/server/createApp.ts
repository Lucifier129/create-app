/**
 * createApp at server
 */
import History from 'create-history'
import * as _ from '../share/util'
import defaultViewEngine from './viewEngine'
import createMatcher from '../share/createMatcher'
import defaultAppSettings from '../share/defaultSettings'
import CA, { createController } from '../index'

const createHistory: CA.CreateHistory = (settings) => {
  let create: History.CreateHistory = History.createMemoryHistory
  if (settings.basename) {
    create = History.useBasename(create)
  }
  create = History.useQueries(create)
  return create(settings)
}

const createApp: CA.CreateApp = (appSettings) => {
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

  const render: CA.ServerRender = (requestPath, injectContext, callback) => {
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

  const initController: CA.InitController = (controller) => {
    if (_.isThenable(controller)) {
      return (<Promise<CA.Controller>>controller).then(initController)
    }
    let component = (<CA.Controller>controller).init && (<CA.Controller>controller).init()

    if (component === null) {
      return { controller }
    }

    if (_.isThenable(component)) {
      return (<Promise<{}>>component).then(component => {
        if (component == null) {
          return { controller }
        }
        let content = renderToString(component, controller as CA.Controller)
        return { content, controller }
      })
    }
    let content = renderToString(component, controller as CA.Controller)
    return { content, controller }
  }

  const fetchController: CA.FetchController = (requestPath, injectContext) => {
    let location: CA.Location = history.createLocation(requestPath)
    let matches: CA.Matches = matcher(location.pathname)

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

  const renderToString: CA.RenderToString = (component, controller) => {
    return viewEngine.render(component, undefined, controller)
  }

  return {
    render,
    history,
  }
}
export default createApp
