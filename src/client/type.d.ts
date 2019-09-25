import { NativeHistory, NLWithBQ } from 'create-history'
import {
  Context,
  Callback,
  Settings,
  AppElement,
  Controller,
  ControllerConstructor,
  Listener,
  HistoryNativeLocation,
  HistoryBaseLocation,
  Matcher,
  Route,
  Loader
} from '../share/type'

export interface ClientController {
  location: HistoryNativeLocation
  context: Context
  history: NativeHistory
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

interface CreateApp {
  (settings: Partial<Settings>): App
}

interface Render {
  (targetPath: string | NLWithBQ): any
}

interface Stop {
  (): void
}

interface Start {
  (
    callback?: Callback,
    shouldRenderWithCurrentLocation?: boolean
  ): Stop | null
}

interface Stop {
  (): void
}

interface Publish {
  (location: NLWithBQ): void
}

interface App {
  start: Start
  stop: Stop
  render: Render
  history: NativeHistory
  subscribe: Subscribe
}

interface Subscribe {
  (listener: Listener): () => void
}

interface InitController {
  (
    c: ControllerConstructor | Promise<ControllerConstructor>
  ): AppElement | Promise<AppElement>
}

interface CreateInitController {
  (location: HistoryNativeLocation): InitController
}

interface ClearContainer {
  (): void
}

interface DestoryContainer {
  (): void
}

interface GetContainer {
  (): HTMLElement | null
}

interface GetControllerByLocation {
  (location: HistoryNativeLocation): ClientController
}