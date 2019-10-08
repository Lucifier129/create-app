/*
  key/value configs
*/
import createHistoryMap, {
  History,
  HistoryOptions,
  ILWithBQ,
  BLWithBQ,
  CreateHistory,
  LocationTypeMap,
  HistoryWithBFOL
} from 'create-history'
import pathToRegexp from 'path-to-regexp'

export type CreateHistoryType = keyof typeof createHistoryMap


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

export interface Matches<C> {
  path: pathToRegexp.Path
  params: Params
  controller: ControllerConstructor | LoadController | string
}

export interface Matcher {
  <C extends Controller>(pathname: string): Matches<C> | null
}

export interface ViewEngine<E = string, C extends Controller = Controller> {
  render: ViewEngineRender<E, C>
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
  viewEngine?: ViewEngine<any, Controller>
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

export interface HistoryLocation extends ILWithBQ {
  raw: string
  pattern: pathToRegexp.Path
  params: Params
}

export interface Loader {
  <C extends Controller>(
    controller: ControllerConstructor | LoadController | string,
    location?: HistoryLocation,
    context?: Context
  ): ControllerConstructor | Promise<ControllerConstructor>
}

export interface LoadController {
  (location?: HistoryLocation, context?: Context): ControllerConstructor | Promise<ControllerConstructor>
}

export interface Controller {
  KeepAlive?: boolean
  count?: number
  restore?(location?: HistoryLocation, context?: Context): any
  init(): any
  render(): any
  destroy?(): void
  getContainer?(): HTMLElement | null
  refreshView?(): void
  [x: string]: any
}

export interface ControllerConstructor<C extends Controller = Controller> {
  new(location?: HistoryLocation, context?: Context): C
}

export interface WrapController<C extends Controller, CC> {
  (IController: ControllerConstructor): CC
}

export interface CreateController<C extends Controller, CC = ControllerConstructor<C>> {
  (c: CC, location: HistoryLocation, context: Context): C
}

export interface ControllerCacheFunc<C extends Controller> {
  (controller: C): void
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

export interface ViewEngineRender<E = string, C extends Controller = Controller> {
  (
    element: E,
    controller?: C,
    container?: Element | null
  ): any
}