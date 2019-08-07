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
  render: (html: HTMLElement | React.ReactNode | void, container?: HTMLElement | string, controller?: Controller) => React.ReactNode | HTMLElement
  clear?: (container: HTMLElement | string) => void
}

export type CreateHistoryType = 'createHashHistory' | 'createMemoryHistory' | 'createBrowserHistory' | 'createHistory'

export interface Settings extends History.HistoryOptions {
  container?: string
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
  start?
  stop?
  render?
  history?
  subscribe?
}

export interface Context {

}

export interface Location extends History.Location {
  raw?: string
  pattern?: pathToRegexp.Path
  params?: Params
}

export interface Loader {
  (controller: Controller | string, location: Location, context: Context)
}

export class Controller {
  constructor (location?: Location, context?: Context) {

  }
  location?: Location
  context?: Context
  history?: History.NativeHistory
  matcher?: Matcher
  loader?: Function
  routes?: Route[]
  KeepAlive?: boolean
  restore?(location: Location, context: Context): any {

  }
  init?(): any {

  }
  render?(): HTMLElement | React.ReactNode | null | undefined | void | boolean {

  }
  destroy?() {

  }
}

export const defaultAppSettings: Settings = {
	container: '#container',
	basename: '',
	context: {
		isServer,
		isClient,
	},
	type: 'createHashHistory',
	loader: value => value,
}