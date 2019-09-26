import { NativeHistory, NLWithBQ, BLWithBQ } from 'create-history'
import {
  Context,
  Callback,
  Settings,
  AppElement,
  ControllerConstructor,
  Listener,
  HistoryNativeLocation,
  HistoryBaseLocation,
  Matcher,
  Route,
  Loader,
  Controller
} from '../share/type'

export interface ClientController extends Controller {
  location: HistoryNativeLocation
  context: Context
  history: NativeHistory<BLWithBQ, NLWithBQ>
  matcher: Matcher
  loader: Loader
  routes: Route[]
}

export interface ClientControllerConstructor {
  new(location: HistoryNativeLocation, context: Context): ClientController
}

interface CreateApp {
  (settings: Partial<Settings<ClientController>>): App
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