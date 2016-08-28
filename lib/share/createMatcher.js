'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createMatcher;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMatcher(routes) {
    var finalRoutes = routes.map(createRoute);
    var routeLength = finalRoutes.length;

    return function matcher(pathname) {
        var finalPathname = cleanPath(pathname);
        for (var i = 0; i < routeLength; i++) {
            var route = finalRoutes[i];
            var matches = route.regexp.exec(finalPathname);
            if (!matches) {
                continue;
            }
            var params = getParams(matches, route.keys);
            var controller = route.controller;
            return {
                path: route.path,
                params: params,
                controller: controller
            };
        }
    };
}

function createRoute(route) {
    var finalRoute = _.extend({}, route);
    var keys = finalRoute.keys = [];
    finalRoute.regexp = (0, _pathToRegexp2.default)(finalRoute.path, keys);
    return finalRoute;
}

function getParams(matches, keys) {
    var params = {};
    for (var i = 1, len = matches.length; i < len; i++) {
        var key = keys[i - 1];
        if (key) {
            if (typeof matches[i] === 'string') {
                params[key.name] = decodeURIComponent(matches[i]);
            } else {
                params[key.name] = matches[i];
            }
        }
    }
    return params;
}

function cleanPath(path) {
    return path.replace(/\/\//g, '/');
}