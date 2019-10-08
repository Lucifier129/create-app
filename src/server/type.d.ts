import { History, LocationTypeMap } from 'create-history'
import {
  Context,
  Callback,
  Settings,
  Matcher,
  Loader,
  Route,
  HistoryLocation,
  HistoryBaseLocation,
  Controller
} from '../share/type'

export interface ServerController extends Controller {
  location: HistoryLocation
  context: Context
}

export interface ServerControllerConstructor {
  new(location: HistoryLocation, context: Context): ServerController
}

export interface App {
  render: Render
  history: History
}

export interface Render {
  (
    requestPath: string,
    injectContext?: Context | null,
    callback?: Callback
  ): InitControllerReturn | Promise<InitControllerReturn>
}

interface CreateApp {
  (settings: Partial<Settings>): App
}

interface InitControllerReturn {
  content?: any
  controller: Controller
}

interface InitController {
  (
    c: ServerController
  ): InitControllerReturn | Promise<InitControllerReturn>
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

export interface CreateHistoryInCA {
  (setting?: Settings): History<LocationTypeMap['BQ']['Base'], LocationTypeMap['BQ']['Intact']>
}