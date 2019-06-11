'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * createApp at client
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createApp(appSettings) {
    var finalAppSettings = _.extend({ viewEngine: defaultViewEngine }, _constant.defaultAppSettings);

    _.extend(finalAppSettings, appSettings);

    var routes = finalAppSettings.routes,
        viewEngine = finalAppSettings.viewEngine,
        loader = finalAppSettings.loader,
        context = finalAppSettings.context,
        container = finalAppSettings.container,
        cacheAmount = finalAppSettings.cacheAmount;


    context = _extends({}, finalAppSettings.context, appSettings.context);

    var history = createHistory(finalAppSettings);
    var matcher = (0, _createMatcher2.default)(routes);
    var currentController = null;
    var currentLocation = null;
    var unlisten = null;
    var finalContainer = null;

    var cache = _.createCache(cacheAmount);

    function saveControllerToCache(controller) {
        cache.set(controller.location.raw, controller);
    }

    function getControllerFromCache(location) {
        return cache.get(location.raw);
    }

    function removeControllerFromCache(controller) {
        cache.remove(controller.location.raw);
    }

    function _getContainer() {
        if (finalContainer) {
            return finalContainer;
        }
        if (typeof container === 'string') {
            return finalContainer = document.querySelector(container);
        } else {
            return finalContainer = container;
        }
    }

    function render(targetPath) {
        var location = typeof targetPath === 'string' ? history.createLocation(targetPath) : targetPath;
        context.prevLocation = currentLocation;
        currentLocation = location;

        var matches = matcher(location.pathname);

        if (!matches) {
            var error = new Error('Did not match any route with pathname:' + location.pathname);
            error.status = 404;
            throw error;
        }

        var path = matches.path,
            params = matches.params,
            controller = matches.controller;


        location.pattern = path;
        location.params = params;
        location.raw = location.pathname + location.search;

        var initController = createInitController(location);
        var Controller = loader(controller, location, context);

        if (_.isThenable(Controller)) {
            return Controller.then(initController);
        } else {
            return initController(Controller);
        }
    }

    var controllers = _.createMap();

    function wrapController(Controller) {
        if (controllers.has(Controller)) {
            return controllers.get(Controller);
        }
        // implement the controller's life-cycle and useful methods

        var WrapperController = function (_Controller) {
            _inherits(WrapperController, _Controller);

            function WrapperController(location, context) {
                _classCallCheck(this, WrapperController);

                var _this = _possibleConstructorReturn(this, (WrapperController.__proto__ || Object.getPrototypeOf(WrapperController)).call(this, location, context));

                _this.location = _this.location || location;
                _this.context = _this.context || context;
                _this.history = history;
                _this.matcher = matcher;
                _this.loader = loader;
                _this.routes = routes;
                return _this;
            }
            // update view


            _createClass(WrapperController, [{
                key: 'refreshView',
                value: function refreshView() {
                    renderToContainer(this.render(), this);
                }
                // get container node

            }, {
                key: 'getContainer',
                value: function getContainer() {
                    return _getContainer();
                }
                // clear container

            }, {
                key: 'clearContainer',
                value: function clearContainer() {
                    _clearContainer();
                }
            }, {
                key: 'saveToCache',
                value: function saveToCache() {
                    this.KeepAlive = true;
                    saveControllerToCache(this);
                }
            }, {
                key: 'removeFromCache',
                value: function removeFromCache() {
                    this.KeepAlive = false;
                    removeControllerFromCache(this);
                }
            }, {
                key: 'getAllCache',
                value: function getAllCache() {
                    return cache.getAll();
                }
            }]);

            return WrapperController;
        }(Controller);

        controllers.set(Controller, WrapperController);

        return WrapperController;
    }

    function createInitController(location) {
        return function initController(Controller) {
            if (currentLocation !== location) {
                return;
            }

            destroyController();

            var controller = currentController = getControllerFromCache(location);
            var component = null;

            if (controller) {
                component = controller.restore(location, context);
                controller.location = location;
                controller.context = context;
            } else {
                var FinalController = wrapController(Controller);
                controller = currentController = new FinalController(location, context);
                component = controller.init();
            }

            // if controller#init|restore return false value, do nothing
            if (component == null) {
                return null;
            }

            if (_.isThenable(component)) {
                return component.then(function (result) {
                    if (currentLocation !== location || result == null) {
                        return null;
                    }
                    saveControllerToCache(controller);
                    return renderToContainer(result, controller);
                });
            }
            saveControllerToCache(controller);
            return renderToContainer(component, controller);
        };
    }

    function renderToContainer(component, controller) {
        return viewEngine.render(component, _getContainer(), controller);
    }

    function _clearContainer() {
        if (viewEngine.clear) {
            return viewEngine.clear(_getContainer());
        }
    }

    function destroyController() {
        if (currentController && !currentController.KeepAlive) {
            removeControllerFromCache(currentController);
        }
        if (currentController && currentController.destroy) {
            currentController.destroy();
            currentController = null;
        }
    }

    var listeners = [];

    function subscribe(listener) {
        var index = listeners.indexOf(listener);
        if (index === -1) {
            listeners.push(listener);
        }
        return function () {
            var index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners = listeners.filter(function (fn) {
                    return fn !== listener;
                });
            }
        };
    }

    function publish(location) {
        for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i](location, history);
        }
    }

    function start(callback, shouldRenderWithCurrentLocation) {
        var listener = function listener(location) {
            var result = render(location);
            if (_.isThenable(result)) {
                result.then(function () {
                    publish(location);
                });
            } else {
                publish(location);
            }
        };
        unlisten = history.listen(listener);
        var unsubscribe = void 0;
        if (typeof callback === 'function') {
            unsubscribe = subscribe(callback);
        }
        if (shouldRenderWithCurrentLocation !== false) {
            listener(history.getCurrentLocation());
        }
        return unsubscribe;
    }

    function stop() {
        if (unlisten) {
            unlisten();
            destroyController();
            currentController = null;
            currentLocation = null;
            unlisten = null;
            finalContainer = null;
            listeners = [];
        }
    }

    return {
        start: start,
        stop: stop,
        render: render,
        history: history,
        subscribe: subscribe
    };
}

function createHistory(settings) {
    var create = _history2.default[settings.type];
    if (settings.basename) {
        create = _history2.default.useBasename(create);
    }
    create = _history2.default.useBeforeUnload(create);
    create = _history2.default.useQueries(create);
    return create(settings);
}