'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
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

    var routes = finalAppSettings.routes;
    var viewEngine = finalAppSettings.viewEngine;
    var loader = finalAppSettings.loader;
    var context = finalAppSettings.context;
    var container = finalAppSettings.container;


    var history = createHistory(finalAppSettings);
    var matcher = (0, _createMatcher2.default)(routes);
    var currentController = null;
    var currentLocation = null;
    var unlisten = null;
    var finalContainer = null;

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

        if (currentLocation) {
            var isEqualPathname = currentLocation.pathname === location.pathname;
            var isEqualSearch = currentLocation.search === location.search;
            var isEqualHash = currentLocation.hash === location.hash;
            if (isEqualPathname && isEqualSearch && isEqualHash) {
                return;
            }
        }

        currentLocation = location;

        var matches = matcher(location.pathname);

        if (!matches) {
            throw new Error('Did not match any route with pathname:' + location.pathname);
        }

        var path = matches.path;
        var params = matches.params;
        var controller = matches.controller;


        location.pattern = path;
        location.params = params;

        var controllerType = typeof controller === 'undefined' ? 'undefined' : _typeof(controller);
        var initController = createInitController(location);

        var Controller = null;

        if (controllerType === 'string') {
            Controller = loader(controller, location);
        } else if (controllerType === 'function') {
            Controller = controller(location, loader);
        } else {
            throw new Error('controller must be string or function');
        }

        if (_.isThenable(Controller)) {
            return Controller.then(initController);
        } else {
            return initController(Controller);
        }
    }

    var controllers = {};

    function getController(pattern, Controller) {
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
                return _this;
            }

            // history apis


            _createClass(WrapperController, [{
                key: 'goReplace',
                value: function goReplace(targetPath) {
                    history.replace(targetPath);
                }
            }, {
                key: 'goTo',
                value: function goTo(targetPath) {
                    history.push(targetPath);
                }
            }, {
                key: 'goIndex',
                value: function goIndex(index) {
                    history.go(index);
                }
            }, {
                key: 'goBack',
                value: function goBack() {
                    history.goBack();
                }
            }, {
                key: 'goForward',
                value: function goForward() {
                    history.goForward();
                }

                // update view

            }, {
                key: 'refreshView',
                value: function refreshView() {
                    renderToContainer(this.render());
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
            }]);

            return WrapperController;
        }(Controller);

        controllers[pattern] = WrapperController;
        return WrapperController;
    }

    function createInitController(location) {
        return function initController(Controller) {
            if (currentLocation !== location) {
                return;
            }
            destroyController();
            var FinalController = getController(location.pattern, Controller);
            var controller = currentController = new FinalController(location, context);
            var unlistenBeforeLeave = null;
            var unlistenBeforeUnload = null;

            if (controller.beforeLeave) {
                var beforeLeave = controller.beforeLeave.bind(controller);
                unlistenBeforeLeave = history.listenBefore(beforeLeave);
            }

            if (controller.beforeUnload) {
                var beforeUnload = controller.beforeUnload.bind(controller);
                unlistenBeforeUnload = history.listenBeforeUnload(beforeUnload);
            }

            controller.$unlisten = function () {
                if (unlistenBeforeLeave) {
                    unlistenBeforeLeave();
                    unlistenBeforeLeave = null;
                }
                if (unlistenBeforeUnload) {
                    unlistenBeforeUnload();
                    unlistenBeforeUnload = null;
                }
            };

            var component = controller.init();

            // if controller.init return false value, do nothing
            if (!component) {
                return null;
            } else if (_.isThenable(component)) {
                return component.then(renderToContainer);
            } else {
                return renderToContainer(component);
            }
        };
    }

    function renderToContainer(component) {
        return viewEngine.render(component, _getContainer(), currentLocation);
    }

    function _clearContainer() {
        if (viewEngine.clear) {
            return viewEngine.clear(_getContainer());
        }
    }

    function destroyController() {
        if (currentController) {
            currentController.$unlisten();
            if (currentController.destroy) {
                currentController.destroy();
            }
            currentController = null;
        }
        _clearContainer();
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
            if (finalAppSettings.type === 'createHashHistory' && location.action === 'POP') {
                return;
            }
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
    create = _history2.default.useBasename(create);
    create = _history2.default.useBeforeUnload(create);
    create = _history2.default.useQueries(create);
    return create(settings);
}