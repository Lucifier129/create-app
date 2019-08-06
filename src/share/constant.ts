/*
  key/value configs
*/
import { Route } from './createMatcher'
export const isClient: boolean = typeof window !== 'undefined'
export const isServer: boolean = !isClient
export interface ViewEngine {
  (html: string, container: HTMLElement): HTMLElement
} 
export interface Settings{
  container?: string
  basename?: string
  context?: {
    isServer: boolean
    isClient: boolean
    [propName: string]: any
  }
  type?: 'createHashHistory' | 'createMemoryHistory' | 'createBrowserHistory'
  loader?: (value: any) => any
  cacheAmount?: number
  routes?: Route[]
  viewEngine?: string
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