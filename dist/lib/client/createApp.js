"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/**
 * createApp at client
 */
var create_history_1 = __importDefault(require("create-history"));
var viewEngine_1 = __importDefault(require("./viewEngine"));
var _ = __importStar(require("../share/util"));
var createMatcher_1 = __importDefault(require("../share/createMatcher"));
var defaultSettings_1 = __importDefault(require("../share/defaultSettings"));
var createController_1 = __importDefault(require("../share/createController"));
var createHistory = function (settings) {
    var historyCreater = create_history_1.default[settings.type];
    if (settings.basename) {
        historyCreater = create_history_1.default.useBasename(historyCreater);
    }
    historyCreater = create_history_1.default.useBeforeUnload(historyCreater);
    historyCreater = create_history_1.default.useQueries(historyCreater);
    return historyCreater(settings);
};
var createApp = function (appSettings) {
    var finalAppSettings = _.extend({ viewEngine: viewEngine_1.default }, defaultSettings_1.default);
    _.extend(finalAppSettings, appSettings);
    var routes = finalAppSettings.routes, viewEngine = finalAppSettings.viewEngine, loader = finalAppSettings.loader, context = finalAppSettings.context, container = finalAppSettings.container, cacheAmount = finalAppSettings.cacheAmount;
    context = __assign({}, finalAppSettings.context, appSettings.context);
    var history = createHistory(finalAppSettings);
    var matcher = createMatcher_1.default(routes);
    var currentController = null;
    var currentLocation = null;
    var unlisten = null;
    var finalContainer = null;
    var cache = _.createCache(cacheAmount);
    var saveControllerToCache = function (controller) {
        cache.set(controller.location.raw, controller);
    };
    var getControllerFromCache = function (location) {
        return cache.get(location.raw);
    };
    var removeControllerFromCache = function (controller) {
        cache.remove(controller.location.raw);
    };
    var getContainer = function () {
        if (finalContainer) {
            return finalContainer;
        }
        if (typeof container === 'string') {
            return finalContainer = document.querySelector(container);
        }
        else {
            return finalContainer = container;
        }
    };
    var render = function (targetPath) {
        var location = typeof targetPath === 'string' ? history.createLocation(targetPath) : targetPath;
        context.prevLocation = currentLocation;
        currentLocation = location;
        var matches = matcher(location.pathname);
        if (!matches) {
            var error = new Error("Did not match any route with pathname:" + location.pathname);
            // @ts-ignore
            error.status = 404;
            throw error;
        }
        var path = matches.path, params = matches.params, controller = matches.controller;
        location.pattern = path;
        location.params = params;
        location.raw = location.pathname + location.search;
        var initController = createInitController(location);
        var iController = loader(controller, location, context);
        if (_.isThenable(iController)) {
            return iController.then(initController);
        }
        else {
            return initController(iController);
        }
    };
    var controllers = _.createMap();
    var wrapController = function (IController) {
        if (controllers.has(IController)) {
            return controllers.get(IController);
        }
        // implement the controller's life-cycle and useful methods
        var WrapperController = /** @class */ (function (_super) {
            __extends(WrapperController, _super);
            function WrapperController(location, context) {
                var _this = _super.call(this, location, context) || this;
                _this.location = _this.location || location;
                _this.context = _this.context || context;
                _this.history = history;
                _this.matcher = matcher;
                _this.loader = loader;
                _this.routes = routes;
                return _this;
            }
            // update view
            WrapperController.prototype.refreshView = function (view) {
                if (view === void 0) { view = this.render(); }
                renderToContainer(view, this);
            };
            // get container node
            WrapperController.prototype.getContainer = function () {
                return getContainer();
            };
            // clear container
            WrapperController.prototype.clearContainer = function () {
                clearContainer();
            };
            WrapperController.prototype.saveToCache = function () {
                this.KeepAlive = true;
                saveControllerToCache(this);
            };
            WrapperController.prototype.removeFromCache = function () {
                this.KeepAlive = false;
                removeControllerFromCache(this);
            };
            WrapperController.prototype.getAllCache = function () {
                return cache.getAll();
            };
            return WrapperController;
        }(IController));
        controllers.set(IController, WrapperController);
        return WrapperController;
    };
    var createInitController = function (location) {
        var initController = function (iController) {
            if (currentLocation !== location) {
                return;
            }
            destroyController();
            var controller = currentController = getControllerFromCache(location);
            var element = null;
            if (controller) {
                element = controller.restore(location, context);
                controller.location = location;
                controller.context = context;
            }
            else {
                var FinalController = wrapController(iController);
                controller = currentController = createController_1.default(FinalController, location, context);
                element = controller.init();
            }
            // if controller#init|restore return false value, do nothing
            if (element == null) {
                return null;
            }
            if (_.isThenable(element)) {
                return element.then(function (result) {
                    if (currentLocation !== location || result == null) {
                        return null;
                    }
                    return renderToContainer(result, controller);
                });
            }
            return renderToContainer(element, controller);
        };
        return initController;
    };
    var renderToContainer = function (element, controller) {
        saveControllerToCache(controller);
        return viewEngine.render(element, getContainer(), controller);
    };
    var clearContainer = function () {
        if (viewEngine.clear) {
            return viewEngine.clear(getContainer());
        }
    };
    var destroyController = function () {
        if (currentController && !currentController.KeepAlive) {
            removeControllerFromCache(currentController);
        }
        if (currentController && currentController.destroy) {
            currentController.destroy();
            currentController = null;
        }
    };
    var listeners = [];
    var subscribe = function (listener) {
        var index = listeners.indexOf(listener);
        if (index === -1) {
            listeners.push(listener);
        }
        return function () {
            var index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners = listeners.filter(function (fn) { return fn !== listener; });
            }
        };
    };
    var publish = function (location) {
        for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i](location, history);
        }
    };
    var start = function (callback, shouldRenderWithCurrentLocation) {
        var listener = function (location) {
            var result = render(location);
            if (_.isThenable(result)) {
                result.then(function () {
                    publish(location);
                });
            }
            else {
                publish(location);
            }
        };
        unlisten = history.listen(listener);
        var unsubscribe;
        if (typeof callback === 'function') {
            unsubscribe = subscribe(callback);
        }
        if (shouldRenderWithCurrentLocation !== false) {
            listener(history.getCurrentLocation());
        }
        return unsubscribe;
    };
    var stop = function () {
        if (unlisten) {
            unlisten();
            destroyController();
            currentController = null;
            currentLocation = null;
            unlisten = null;
            finalContainer = null;
            listeners = [];
        }
    };
    return {
        start: start,
        stop: stop,
        render: render,
        history: history,
        subscribe: subscribe,
    };
};
exports.default = createApp;
//# sourceMappingURL=createApp.js.map