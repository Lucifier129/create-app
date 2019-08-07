import pathToRegexp from 'path-to-regexp'
import * as _ from './util'
import { Controller } from './constant'

export interface Route {
  keys?: pathToRegexp.Key[]
  regexp?: RegExp
  path?: pathToRegexp.Path
  controller?: Controller | string
}

export interface Params {
  [propName: string]: any
}

export interface Matches {
  path: pathToRegexp.Path
  params: Params
  controller: Controller
}

export interface Matcher {
  (pathname: string): Matches
}

const createMatcher: (routes: Route[]) => Matcher = (routes) => {
  const finalRoutes: Route[] = routes.map(createRoute)
  const routeLength: number = finalRoutes.length
  const matcher: Matcher = (pathname) => {
    let finalPathname = cleanPath(pathname)
    for (let i = 0; i < routeLength; i++) {
      let route: Route = finalRoutes[i]
      let strMatches: RegExpExecArray = route.regexp.exec(finalPathname)
      if (!strMatches) {
        continue
      }
      let params: Params = getParams(strMatches, route.keys)
      let controller: any = route.controller
      return {
        path: route.path,
        params,
        controller,
      }
    }
  }

  return matcher
}

export default createMatcher

const createRoute: (route: Route) => Route = (route) => {
  let finalRoute: Route = _.extend({}, route)
  let keys: pathToRegexp.Key[] = finalRoute.keys = []
  finalRoute.regexp = pathToRegexp(finalRoute.path, keys)
  return finalRoute
}

const getParams: (strMatches: RegExpExecArray, keys: pathToRegexp.Key[]) => Params = (matches, keys) => {
  let params: Params = {}
  for (let i = 1, len = matches.length; i < len; i++) {
    let key = keys[i - 1]
    if (key) {
      if (typeof matches[i] === 'string') {
        params[key.name] = decodeURIComponent(matches[i])
      } else {
        params[key.name] = matches[i]
      }
    }
  }
  return params
}

const cleanPath: (path: string) => string = (path) => {
  return path.replace(/\/\//g, '/')
}
