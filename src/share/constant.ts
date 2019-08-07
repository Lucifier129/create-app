/*
  key/value configs
*/
import React from 'react'
import * as History from 'create-history'
import pathToRegexp from 'path-to-regexp'
import { Route, Matcher, Params } from './createMatcher'

export const isClient: boolean = typeof window !== 'undefined'
export const isServer: boolean = !isClient

export interface ViewEngine {
  render: ViewEngineRender
  clear?: ViewEngineClear
}

export interface ViewEngineRender {
  (
    html: HTMLElement | React.ReactNode | void,
    container?: HTMLElement | string,
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

export interface App {
  start?: Start
  stop?: Stop
  render?: Render
  history?: History.NativeHistory
  subscribe?: Subscribe
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

export interface CreateApp {
  (settings: Settings): App
}

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

export interface WrapController {
  (IController: Controller): any
}

export interface CreateInitController {
  (location: Location): InitController
}

export interface RenderToContainer {
  (
    component: HTMLElement | React.ReactNode | void,
    controller: Controller
  ): HTMLElement | React.ReactNode
}

export interface RenderToString {
  (
    component: HTMLElement | React.ReactNode | void,
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
    callback: Callback,
    shouldRenderWithCurrentLocation: boolean
  ): () => void
}

export interface Stop {
  (): void
}

export interface Context {

}

export interface Location extends History.Location {
  raw?: string
  pattern?: pathToRegexp.Path
  params?: Params
}

export interface Loader {
  (
    controller: Controller | string,
    location: Location,
    context: Context
  ): Controller | Promise<Controller>
}

export interface Controller {
  new (location?: Location, context?: Context): Controller
  location?: Location
  context?: Context
  history?: History.NativeHistory
  matcher?: Matcher
  loader?: Function
  routes?: Route[]
  KeepAlive?: boolean
  count?: number
  restore?(location: Location, context: Context): any
  init?(): any
  render?(): HTMLElement | React.ReactNode | null | undefined | boolean
  destroy?(): void
  getContainer?(): string | HTMLElement
  refreshView?()
}

export const defaultAppSettings: Settings = {
	container: '#container',
	basename: '',
	context: {
		isServer,
		isClient,
	},
	type: 'createHashHistory',
	loader: value => value as Controller
}