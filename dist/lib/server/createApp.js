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
 * createApp at server
 */
var create_history_1 = __importDefault(require("create-history"));
var _ = __importStar(require("../share/util"));
var viewEngine_1 = __importDefault(require("./viewEngine"));
var createMatcher_1 = __importDefault(require("../share/createMatcher"));
var defaultSettings_1 = __importDefault(require("../share/defaultSettings"));
var createController_1 = __importDefault(require("../share/createController"));
var createHistory = function (settings) {
    var create = create_history_1.default.createMemoryHistory;
    if (settings.basename) {
        create = create_history_1.default.useBasename(create);
    }
    create = create_history_1.default.useQueries(create);
    return create(settings);
};
var createApp = function (appSettings) {
    var finalAppSettings = _.extend({ viewEngine: viewEngine_1.default }, defaultSettings_1.default);
    _.extend(finalAppSettings, appSettings);
    var routes = finalAppSettings.routes, viewEngine = finalAppSettings.viewEngine, loader = finalAppSettings.loader, context = finalAppSettings.context;
    context = __assign({}, finalAppSettings.context, appSettings.context);
    var matcher = createMatcher_1.default(routes);
    var history = createHistory(finalAppSettings);
    var render = function (requestPath, injectContext, callback) {
        var result = null;
        console.log(0);
        if (typeof injectContext === 'function') {
            callback = injectContext;
            injectContext = null;
        }
        try {
            console.log('1');
            result = initController(fetchController(requestPath, injectContext));
            console.log('2');
        }
        catch (error) {
            console.log(3);
            callback && callback(error);
            return Promise.reject(error);
        }
        console.log(4);
        if (_.isThenable(result)) {
            console.log(5);
            if (callback) {
                result.then(function (result) { return callback(null, result); }, callback);
            }
            return result;
        }
        console.log(6);
        callback && callback(null, result);
        return result;
    };
    var initController = function (controller) {
        if (_.isThenable(controller)) {
            return controller.then(initController);
        }
        var element = controller.init && controller.init();
        if (element === null) {
            return { controller: controller };
        }
        if (_.isThenable(element)) {
            return element.then(function (element) {
                if (element == null) {
                    return { controller: controller };
                }
                var content = renderToString(element, controller);
                return { content: content, controller: controller };
            });
        }
        var content = renderToString(element, controller);
        return { content: content, controller: controller };
    };
    var fetchController = function (requestPath, injectContext) {
        var location = history.createLocation(requestPath);
        var matches = matcher(location.pathname);
        if (!matches) {
            var error = new Error("Did not match any route with path:" + requestPath);
            // @ts-ignore
            error.status = 404;
            return Promise.reject(error);
        }
        var path = matches.path, params = matches.params, controller = matches.controller;
        location.pattern = path;
        location.params = params;
        location.raw = requestPath;
        var finalContext = __assign({}, context, injectContext);
        var iController = loader(controller, location, finalContext);
        if (_.isThenable(iController)) {
            return iController.then(function (iController) {
                var Wrapper = wrapController(iController);
                return createController_1.default(Wrapper, location, finalContext);
            });
        }
        var Wrapper = wrapController(iController);
        return createController_1.default(Wrapper, location, finalContext);
    };
    var controllers = _.createMap();
    var wrapController = function (iController) {
        if (controllers.has(iController)) {
            return controllers.get(iController);
        }
        // implement the controller's life-cycle and useful methods
        var WrapperController = /** @class */ (function (_super) {
            __extends(WrapperController, _super);
            function WrapperController(location, context) {
                var _this = _super.call(this, location, context) || this;
                _this.location = _this.location || location;
                _this.context = _this.context || context;
                _this.matcher = matcher;
                _this.loader = loader;
                _this.routes = routes;
                return _this;
            }
            return WrapperController;
        }(iController));
        controllers.set(iController, WrapperController);
        return WrapperController;
    };
    var renderToString = function (element, controller) {
        return viewEngine.render(element, undefined, controller);
    };
    return {
        render: render,
        history: history,
    };
};
exports.default = createApp;
//# sourceMappingURL=createApp.js.map