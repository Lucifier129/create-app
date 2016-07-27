import pathToRegexp from 'path-to-regexp'
import * as _ from './util'

export default function createMatcher($routes) {
    const routes = $routes.map(createRoute)
    return function matcher($pathname) {
        let pathname = cleanPath($pathname)
        for (let i = 0, len = routes.length; i < len; i++) {
            let route = routes[i]
            let matches = route.regexp.exec(pathname)
            if (matches) {
                let params = getParams(matches, route.keys)
                let controller = route.controller
                return {
                    path: route.path,
                    params,
                    controller
                }
            }
        }
    }
}

function createRoute($route) {
    let route = _.extend({}, $route)
    let keys = route.keys = []
    route.regexp = pathToRegexp(route.path, keys)
    return route
}

function getParams(matches, keys) {
    let params = {}
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

function cleanPath(path) {
    return path.replace(/\/\//g, '/')
}
