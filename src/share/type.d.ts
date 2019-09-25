/*
  key/value configs
*/
import createHistoryMap, {
  NativeHistory,
  HistoryOptions,
  NLWithBQ,
  BLWithBQ,
  CreateHistory,
  LocationTypeMap
} from 'create-history'
import pathToRegexp from 'path-to-regexp'

export type CreateHistoryType = keyof typeof createHistoryMap

export interface CreateHistoryInCA {
  (setting: Settings): NativeHistory<LocationTypeMap['BQ']['Base'], LocationTypeMap['BQ']['Native']>
}

export interface Route {
  keys?: pathToRegexp.Key[]
  regexp?: RegExp
  path: pathToRegexp.Path
  controller: ControllerConstructor | LoadController | string
}

export interface IntactRoute {
  keys: pathToRegexp.Key[]
  regexp: RegExp
  path: pathToRegexp.Path
  controller: ControllerConstructor | LoadController | string
}

export interface Params {
  [propName: string]: any
}

export interface Matches {
  path: pathToRegexp.Path
  params: Params
  controller: ControllerConstructor | LoadController | string
}

export interface Matcher {
  (pathname: string): Matches | null
}

export interface ViewEngine {
  render: ViewEngineRender
  clear?: ViewEngineClear
}

export interface ViewEngineClear {
  (container: Element): void
}

export interface Settings extends HistoryOptions {
  container: string | HTMLElement
  basename: string
  context: Context
  type: CreateHistoryType
  loader: Loader
  cacheAmount?: number
  routes?: Route[]
  viewEngine?: ViewEngine
}

export interface ControllerCacheFunc<C = Controller> {
  (controller: C): void
}

export interface WrapController<C = Controller> {
  (IController: ControllerConstructor): ControllerConstructor<C>
}

export type Listener = Function

export type Callback = Function

export interface Context {
  isClient?: boolean
  isServer?: boolean
  prevLocation?: object | null
  location?: HistoryBaseLocation
  [propName: string]: any
}

export interface HistoryBaseLocation extends BLWithBQ {
  raw?: string
  pattern?: pathToRegexp.Path
  params?: Params
}

export interface HistoryNativeLocation extends NLWithBQ {
  raw: string
  pattern: pathToRegexp.Path
  params: Params
}

export interface Loader {
  (
    controller: ControllerConstructor | LoadController | string,
    location?: HistoryNativeLocation,
    context?: Context
  ): ControllerConstructor | Promise<ControllerConstructor>
}

export interface LoadController {
  (location?: HistoryNativeLocation, context?: Context): ControllerConstructor | Promise<ControllerConstructor>
}

export interface ControllerConstructor<C = Controller> {
  new(location: HistoryNativeLocation, context: Context): C;
}

export interface Controller {
  location?: HistoryNativeLocation
  context?: Context
  history?: NativeHistory
  matcher?: Matcher
  loader?: Function
  routes?: Route[]
  KeepAlive?: boolean
  count?: number
  restore?(location?: HistoryNativeLocation, context?: Context): AppElement | Promise<AppElement>
  init(): AppElement | Promise<AppElement>
  render(): AppElement
  destroy?(): void
  getContainer?(): HTMLElement | null
  refreshView?(): void
}


export interface CreateController<C = Controller> {
  (c: ControllerConstructor<C>, location: HistoryNativeLocation, context: Context): C
}

export interface Cache<T> {
  keys: () => string[]
  get: (key: string) => T
  set: (key: string, value: T) => void
  remove: (key: string) => void
  getAll: () => CacheStorage<T>
}

export interface CacheStorage<T> {
  [key: string]: T
}

export interface CreateCache {
  <T>(amount?: number): Cache<T>
}

export interface AppMap<K, V> {
  get: (key: K) => V
  set: (key: K, value: V) => void
  has: (key: K) => boolean
  remove: (key: K) => void
}

export interface MapItem<K, V> {
  key: K
  value: V
}

export interface CreateMap {
  <K, V>(): AppMap<K, V>
}

export interface OtherElement {
  [propName: string]: any
}

export type AppElement = Element | string | number | boolean | null | undefined

export interface ViewEngineRender<C = Controller> {
  (
    element: AppElement,
    controller?: C,
    container?: Element | null
  ): AppElement
}