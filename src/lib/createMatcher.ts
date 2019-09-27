import pathToRegexp from 'path-to-regexp'
import * as _ from './util'
import { Route, IntactRoute, Matcher, Params, ControllerConstructor, LoadController } from './type'

export interface CreateMatcher {
  (routes: Route[]): Matcher
}

export interface CreateRoute {
  (route: Route): IntactRoute
}

export interface GetParams {
  (strMatches: RegExpExecArray, keys: pathToRegexp.Key[]): Params
}

export interface CleanPath {
  (path: string): string
}

const createMatcher: CreateMatcher = (routes) => {
  const finalRoutes: IntactRoute[] = routes.map(createRoute)
  const routeLength: number = finalRoutes.length
  const matcher: Matcher = (pathname) => {
    let finalPathname = cleanPath(pathname)
    for (let i = 0; i < routeLength; i++) {
      let route: IntactRoute = finalRoutes[i]
      let strMatches: RegExpExecArray | null = route.regexp.exec(finalPathname)
      if (!strMatches) {
        continue
      }
      let params: Params = getParams(strMatches, route.keys)
      let controller: ControllerConstructor | LoadController | string = route.controller
      return {
        path: route.path,
        params,
        controller
      }
    }
    return null
  }

  return matcher
}

export default createMatcher

const createRoute: CreateRoute = (route) => {
  let finalRoute: Route = Object.assign({}, route)
  finalRoute.keys = []
  let keys: pathToRegexp.Key[] = finalRoute.keys
  let regexp = pathToRegexp(finalRoute.path, keys)
  let intactRoute: IntactRoute = Object.assign({ keys, regexp }, finalRoute)
  return intactRoute
}

const getParams: GetParams = (matches, keys) => {
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

const cleanPath: CleanPath = (path) => {
  return path.replace(/\/\//g, '/')
}
