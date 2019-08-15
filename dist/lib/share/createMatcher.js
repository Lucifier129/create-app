"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_to_regexp_1 = __importDefault(require("path-to-regexp"));
var _ = __importStar(require("./util"));
var createMatcher = function (routes) {
    var finalRoutes = routes.map(createRoute);
    var routeLength = finalRoutes.length;
    var matcher = function (pathname) {
        var finalPathname = cleanPath(pathname);
        for (var i = 0; i < routeLength; i++) {
            var route = finalRoutes[i];
            var strMatches = route.regexp.exec(finalPathname);
            if (!strMatches) {
                continue;
            }
            var params = getParams(strMatches, route.keys);
            var controller = route.controller;
            return {
                path: route.path,
                params: params,
                controller: controller,
            };
        }
    };
    return matcher;
};
exports.default = createMatcher;
var createRoute = function (route) {
    var finalRoute = _.extend({}, route);
    var keys = finalRoute.keys = [];
    finalRoute.regexp = path_to_regexp_1.default(finalRoute.path, keys);
    return finalRoute;
};
var getParams = function (matches, keys) {
    var params = {};
    for (var i = 1, len = matches.length; i < len; i++) {
        var key = keys[i - 1];
        if (key) {
            if (typeof matches[i] === 'string') {
                params[key.name] = decodeURIComponent(matches[i]);
            }
            else {
                params[key.name] = matches[i];
            }
        }
    }
    return params;
};
var cleanPath = function (path) {
    return path.replace(/\/\//g, '/');
};
//# sourceMappingURL=createMatcher.js.map