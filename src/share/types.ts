/*
  key/value configs
*/
import History, { Location as HistoryLocation } from 'create-history'
import pathToRegexp from 'path-to-regexp'
import Client from '../client'
import Server from '../server'

export default CA

declare namespace CA {
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
    controller: ControllerConstructor
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

  export interface RenderTo<E = string> {
    (element: E): any
  }
  
  export type CreateHistoryType = 
    'createHashHistory' | 
    'createMemoryHistory' | 
    'createBrowserHistory' | 
    'createHistory'
  
  export interface Settings extends History.HistoryOptions {
    container?: string | HTMLElement
    basename?: string
    context?: Context
    type?: CreateHistoryType
    loader?: Loader
    cacheAmount?: number
    routes?: Route[]
    viewEngine?: ViewEngine
  }
  
  export type App = Client.App | Server.App

  export interface CreateHistory {
    (settings: Settings): History.NativeHistory
  }
  
  export interface ControllerCacheFunc {
    (controller: Controller): void
  }
  
  export type CreateApp = Server.CreateApp | Client.CreateApp

  
  export type Render = Client.Render | Server.Render
  
  export interface WrapController {
    (IController: ControllerConstructor): any
  }
  
  export type Listener = Function
  
  export type Callback = Function
  
  export interface Context {
    isClient?: boolean
    isServer?: boolean
    prevLocation?: object | null
    location?: Location
    [propName: string]: any
  }
  
  export interface Location extends HistoryLocation {
    raw?: string
    pattern?: pathToRegexp.Path
    params?: Params
  }
  
  export interface Loader {
    (
      controller: ControllerConstructor | LoadController | string,
      location: Location,
      context: Context
    ): ControllerConstructor | Promise<ControllerConstructor>
  }
  
  export interface LoadController {
    (location?: Location, context?: Context): ControllerConstructor | Promise<ControllerConstructor>
  }
  
  export interface ControllerConstructor {
    new (location?: Location, context?: Context): Controller;
  }
  
  export interface Controller {
    location?: Location
    context?: Context
    history?: History.NativeHistory
    matcher?: Matcher
    loader?: Function
    routes?: Route[]
    KeepAlive?: boolean
    count?: number
    restore?(location?: Location, context?: Context): any
    init?(): any
    render?(): Element | HTMLElement | string | number | boolean | null | undefined
    destroy?(): void
    getContainer?(): Element
    refreshView?()
  }
  
  export interface CreateController {
    (c: CA.ControllerConstructor, location: CA.Location, context: CA.Context): CA.Controller
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
  
  export interface IsThenable {
    (obj: any): boolean
  }
  
  export interface Identity {
    (obj: object): object
  }
  
  export interface Extend {
    (to: object, from: object): object
  }

  type AppElement = HTMLElement | Element | string | number | boolean | null | undefined
  
  export interface ViewEngineRender<E = string> {
    (
      element: E,
      container: Element | null,
      controller?: Controller
    ): AppElement
  }
}

