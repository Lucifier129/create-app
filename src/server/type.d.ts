import { NativeHistory } from 'create-history'
import {
  Context,
  Callback,
  Settings,
  AppElement,
  Controller,
  Matcher,
  Loader,
  Route,
  HistoryNativeLocation,
  HistoryBaseLocation
} from '../share/type'

export interface ServerController {
  location: HistoryNativeLocation
  context: Context
  matcher: Matcher
  loader: Loader
  routes: Route[]
  KeepAlive?: boolean
  count?: number
  restore?(location?: HistoryNativeLocation, context?: Context): AppElement | Promise<AppElement>
  init(): AppElement | Promise<AppElement>
  render(): AppElement
  destroy?(): void
  getContainer?(): HTMLElement | null
  refreshView?(): void
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
  (settings: Partial<Settings>): App
}

interface InitControllerReturn {
  content?: AppElement
  controller: ServerController
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
  ): any
}