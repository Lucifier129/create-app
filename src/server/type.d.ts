import { NativeHistory } from 'create-history'
import {
  Context,
  Callback,
  Settings,
  AppElement,
  Matcher,
  Loader,
  Route,
  HistoryNativeLocation,
  HistoryBaseLocation,
  Controller
} from '../share/type'

export interface MidController extends Controller {
  location?: HistoryNativeLocation
  context?: Context
  matcher: Matcher
  loader: Loader
  routes: Route[]
}

export interface ServerController extends MidController {
  location: HistoryNativeLocation
  context: Context
}

export interface ServerControllerConstructor {
  new(location: HistoryNativeLocation, context: Context): ServerController
}

export interface App {
  render: Render
  history: NativeHistory
}

export interface Render {
  (
    requestPath: string,
    injectContext?: Context | null,
    callback?: Callback
  ): any
}

interface CreateApp {
  (settings: Partial<Settings<ServerController>>): App
}

interface InitControllerReturn {
  content?: AppElement
  controller: Controller
}

interface InitController {
  (
    c: ServerController
  ): InitControllerReturn | Promise<InitControllerReturn> | null
}

interface CreateInitController {
  (location: HistoryBaseLocation): InitController
}

export interface FetchController {
  (
    requestPath: string,
    injectContext?: Context | null
  ): ServerController | Promise<ServerController>
}