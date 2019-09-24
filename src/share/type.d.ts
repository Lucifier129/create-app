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
  path?: pathToRegexp.Path
  controller?: ControllerConstructor | string
}

export interface Params {
  [propName: string]: any
}

export interface Matches {
  path: pathToRegexp.Path
  params: Params
  controller: ControllerConstructor | string
}

export interface Matcher {
  (pathname: string): Matches
}

export interface ViewEngine {
  render: ViewEngineRender<any> | RenderTo<any>
  clear?: ViewEngineClear
}

export interface ViewEngineClear {
  (container: Element): void
}

export interface RenderTo<C = string> {
  (component: C): any
}

export interface Settings extends HistoryOptions {
  container?: string | HTMLElement
  basename?: string
  context?: Context
  type?: CreateHistoryType
  loader?: Loader
  cacheAmount?: number
  routes?: Route[]
  viewEngine?: ViewEngine
}

export interface ControllerCacheFunc {
  (controller: Controller): void
}

export interface WrapController {
  (IController: ControllerConstructor): ControllerConstructor
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
  raw?: string
  pattern?: pathToRegexp.Path
  params?: Params
}

export interface Loader {
  (
    controller: ControllerConstructor | LoadController | string,
    location?: HistoryBaseLocation,
    context?: Context
  ): ControllerConstructor | Promise<ControllerConstructor>
}

export interface LoadController {
  (location?: HistoryBaseLocation, context?: Context): ControllerConstructor | Promise<ControllerConstructor>
}

export interface ControllerConstructor<C = any> {
  new(location?: HistoryBaseLocation, context?: Context): Controller<C>;
}

export interface Controller<C = any> {
  location?: HistoryBaseLocation
  context?: Context
  history?: NativeHistory
  matcher?: Matcher
  loader?: Function
  routes?: Route[]
  KeepAlive?: boolean
  count?: number
  restore?(location?: HistoryBaseLocation, context?: Context): C | Promise<C>
  init(): C | Promise<C>
  render(): AppElement
  destroy?(): void
  getContainer?(): HTMLElement
  refreshView?()
}

export interface CreateController {
  (c: ControllerConstructor, location: HistoryBaseLocation, context: Context): Controller
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

export type AppElement = Element | OtherElement | string | number | boolean | null | undefined

export interface ViewEngineRender<C = string> {
  (
    component: C,
    controller?: Controller,
    container?: Element | null
  ): AppElement
}