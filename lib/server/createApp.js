'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * createApp at server
                                                                                                                                                                                                                                                                   */


exports.default = createApp;

var _util = require('../share/util');

var _ = _interopRequireWildcard(_util);

var _createMatcher = require('../share/createMatcher');

var _createMatcher2 = _interopRequireDefault(_createMatcher);

var _constant = require('../share/constant');

var _viewEngine = require('./viewEngine');

var defaultViewEngine = _interopRequireWildcard(_viewEngine);

var _history = require('../share/history');

var _history2 = _interopRequireDefault(_history);

var _createMemoryHistory = require('create-history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createApp(appSettings) {
    var finalAppSettings = _.extend({ viewEngine: defaultViewEngine }, _constant.defaultAppSettings);

    _.extend(finalAppSettings, appSettings);

    var routes = finalAppSettings.routes;
    var viewEngine = finalAppSettings.viewEngine;
    var loader = finalAppSettings.loader;
    var context = finalAppSettings.context;
    var _finalAppSettings$bas = finalAppSettings.basename;
    var basename = _finalAppSettings$bas === undefined ? '' : _finalAppSettings$bas;


    context = _extends({}, finalAppSettings.context, appSettings.context);

    var matcher = (0, _createMatcher2.default)(routes);
    var history = createHistory(finalAppSettings);

    function render(requestPath, injectContext, callback) {
        var result = null;

        if (typeof injectContext === 'function') {
            callback = injectContext;
            injectContext = null;
        }

        try {
            result = initController(fetchController(requestPath, injectContext));
        } catch (error) {
            callback && callback(error);
            return Promise.reject(error);
        }

        if (_.isThenable(result)) {
            if (callback) {
                result.then(function (result) {
                    return callback(null, result);
                }, callback);
            }
            return result;
        }
        callback && callback(null, result);
        return result;
    }

    function initController(controller) {
        if (_.isThenable(controller)) {
            return controller.then(initController);
        }
        var component = controller.init();

        if (component == null) {
            return { controller: controller };
        }

        if (_.isThenable(component)) {
            return component.then(function (component) {
                if (component == null) {
                    return { controller: controller };
                }
                var content = renderToString(component);
                return { content: content, controller: controller };
            });
        }
        var content = renderToString(component);
        return { content: content, controller: controller };
    }

    function fetchController(requestPath, injectContext) {
        var location = history.createLocation(requestPath);
        var matches = matcher(location.pathname);

        if (!matches) {
            var error = new Error('Did not match any route with path:' + requestPath);
            error.status = 404;
            return Promise.reject(error);
        }

        var path = matches.path;
        var params = matches.params;
        var controller = matches.controller;


        location.pattern = path;
        location.params = params;
        location.raw = requestPath;

        var Controller = loader(controller, location, context);
        var finalContext = _extends({}, context, injectContext);

        if (_.isThenable(Controller)) {
            return Controller.then(function (Controller) {
                var Wrapper = wrapController(location.pattern, Controller);
                return new Wrapper(location, finalContext);
            });
        }

        var Wrapper = wrapController(location.pattern, Controller);
        return new Wrapper(location, finalContext);
    }

    var controllers = {};

    function wrapController(pattern, Controller) {
        if (controllers.hasOwnProperty(pattern)) {
            return controllers[pattern];
        }

        // implement the controller's life-cycle and useful methods

        var WrapperController = function (_Controller) {
            _inherits(WrapperController, _Controller);

            function WrapperController(location, context) {
                _classCallCheck(this, WrapperController);

                var _this = _possibleConstructorReturn(this, (WrapperController.__proto__ || Object.getPrototypeOf(WrapperController)).call(this, location, context));

                _this.location = _this.location || location;
                _this.context = _this.context || context;
                _this.matcher = matcher;
                return _this;
            }

            return WrapperController;
        }(Controller);

        controllers[pattern] = WrapperController;
        return WrapperController;
    }

    function renderToString(component) {
        return viewEngine.render(component);
    }

    return {
        render: render,
        history: history
    };
}

function createHistory(settings) {
    var create = _createMemoryHistory2.default;
    if (settings.basename) {
        create = _history2.default.useBasename(create);
    }
    create = _history2.default.useQueries(create);
    return create(settings);
}