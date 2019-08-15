import pathToRegexp from 'path-to-regexp'
import * as _ from './util'
import CA from './types'


const createMatcher: (routes: CA.Route[]) => CA.Matcher = (routes) => {
  const finalRoutes: CA.Route[] = routes.map(createRoute)
  const routeLength: number = finalRoutes.length
  const matcher: CA.Matcher = (pathname) => {
    let finalPathname = cleanPath(pathname)
    for (let i = 0; i < routeLength; i++) {
      let route: CA.Route = finalRoutes[i]
      let strMatches: RegExpExecArray = route.regexp.exec(finalPathname)
      if (!strMatches) {
        continue
      }
      let params: CA.Params = getParams(strMatches, route.keys)
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

const createRoute: (route: CA.Route) => CA.Route = (route) => {
  let finalRoute: CA.Route = _.extend({}, route)
  let keys: pathToRegexp.Key[] = finalRoute.keys = []
  finalRoute.regexp = pathToRegexp(finalRoute.path, keys)
  return finalRoute
}

const getParams: (strMatches: RegExpExecArray, keys: pathToRegexp.Key[]) => CA.Params = (matches, keys) => {
  let params: CA.Params = {}
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
