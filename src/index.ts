/*
  key/value configs
*/
import React from 'react'
import History, { Location as HistoryLocation } from 'create-history'
import pathToRegexp from 'path-to-regexp'

import _server from './server/index'
import _client from './client/index'

const CA = {
  server: _server,
  client: _client
}

export const server = _server
export const client = _client

export default CA

export const createController: CA.CreateController = (c, location, context) => {
  return new c(location, context)
}

namespace CA {
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
    render: ViewEngineRender
    clear?: ViewEngineClear
  }
  
  export interface ViewEngineRender extends ReactDOM.Renderer {
    (
      html: Element | React.ReactNode,
      container?: Element | string,
      controller?: Controller
    ): React.ReactNode | HTMLElement
  }
  
  export interface ViewEngineClear {
    (container: HTMLElement | string): void
  }
  
  export type CreateHistoryType = 
    'createHashHistory' | 
    'createMemoryHistory' | 
    'createBrowserHistory' | 
    'createHistory'
  
  export interface Settings extends History.HistoryOptions {
    container?: string | HTMLElement
    basename?: string
    context?: {
      isServer?: boolean
      isClient?: boolean
      location?: Location
      [propName: string]: any
    }
    type?: CreateHistoryType
    loader?: Loader
    cacheAmount?: number
    routes?: Route[]
    viewEngine?: ViewEngine
  }
  
  export type App = Client | Server

  export interface Client {
    start?: Start
    stop?: Stop
    render?: ClientRender
    history?: History.NativeHistory
    subscribe?: Subscribe
  }

  export interface Server {
    render?: ServerRender
    history?: History.NativeHistory
  }
  
  export interface CreateHistory {
    (settings: Settings): History.NativeHistory
  }
  
  export interface ControllerCacheFunc {
    (controller: Controller): void
  }
  
  export interface GetControllerByLocation {
    (location: Location): Controller
  }

  export interface CreateServer {
    (settings: Settings): Server
  }

  export interface CreateClient {
    (settings: Settings): Client
  }
  
  export type CreateApp = CreateServer | CreateClient
  
  export interface ClientRender {
    (targetPath: string | Location): any
  }
  
  export interface ServerRender {
    (requestPath: string, injectContext?: Context, callback?: Callback): any
  }
  
  export type Render = ClientRender | ServerRender
  
  export interface GetContainer {
    (): string | HTMLElement
  }
  
  export interface InitController {
    (c: Controller | Promise<Controller>): HTMLElement | React.ReactNode
  }
  
  export interface ClientInitController {
    (c: ControllerConstructor | Promise<ControllerConstructor>): HTMLElement | React.ReactNode
  }
  
  export interface WrapController {
    (IController: ControllerConstructor): any
  }
  
  export interface CreateInitController {
    (location: Location): ClientInitController
  }
  
  export interface RenderToContainer {
    (
      component: HTMLElement | React.ReactNode,
      controller: Controller
    ): HTMLElement | React.ReactNode
  }
  
  export interface RenderToString {
    (
      component: HTMLElement | React.ReactNode,
      controller: Controller
    ): React.ReactNode | HTMLElement
  }
  
  export interface FetchController {
    (
      requestPath: string,
      injectContext: Context
    ): any
  }
  
  export interface ClearContainer {
    (): void
  }
  
  export interface DestoryContainer {
    (): void
  }
  
  export type Listener = Function
  
  export interface Subscribe {
    (listener: Listener): () => void
  }
  
  export interface Publish {
    (location: Location): void
  }
  
  export type Callback = Function
  
  export interface Start {
    (
      callback?: Callback,
      shouldRenderWithCurrentLocation?: boolean
    ): () => void
  }
  
  export interface Stop {
    (): void
  }
  
  export interface Context {
  
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
    render?(): HTMLElement | React.ReactNode | null | undefined | boolean
    destroy?(): void
    getContainer?(): string | HTMLElement
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
}