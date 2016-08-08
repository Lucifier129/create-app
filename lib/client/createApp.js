/**
 * createApp at client
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createApp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _shareUtil = require('../share/util');

var _ = _interopRequireWildcard(_shareUtil);

var _shareCreateMatcher = require('../share/createMatcher');

var _shareCreateMatcher2 = _interopRequireDefault(_shareCreateMatcher);

var _shareConstant = require('../share/constant');

var _viewEngine = require('./viewEngine');

var defaultViewEngine = _interopRequireWildcard(_viewEngine);

var _shareHistory = require('../share/history');

var _shareHistory2 = _interopRequireDefault(_shareHistory);

var uid = 0;

function createApp(appSettings) {
    var finalAppSettings = _.extend({ viewEngine: defaultViewEngine }, _shareConstant.defaultAppSettings);

    _.extend(finalAppSettings, appSettings);

    var routes = finalAppSettings.routes;
    var viewEngine = finalAppSettings.viewEngine;
    var loader = finalAppSettings.loader;
    var context = finalAppSettings.context;
    var container = finalAppSettings.container;

    var history = createHistory(finalAppSettings);
    var matcher = (0, _shareCreateMatcher2['default'])(routes);
    var currentController = null;
    var currentLocation = null;
    var unlisten = null;
    var finalContainer = null;

    var id = uid++;

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
                // console.log('equal', location.pathname)
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

        var controllerType = typeof controller;
        var initController = createInitController(location);

        if (controllerType === 'string') {
            var result = loader(controller, initController, location);
            if (_.isThenable(result)) {
                return result.then(initController);
            } else {
                return result;
            }
        }

        if (controllerType === 'function') {
            var result = controller(location, loader);
            if (_.isThenable(result)) {
                return result.then(initController);
            } else {
                return initController(result);
            }
        }

        throw new Error('controller must be string or function');
    }

    var controllers = {};

    function getController(pattern, Controller) {
        if (controllers.hasOwnProperty(pattern)) {
            return controllers[pattern];
        }
        // implement the controller's life-cycle and useful methods

        var WrapperController = (function (_Controller) {
            _inherits(WrapperController, _Controller);

            function WrapperController(location, context) {
                _classCallCheck(this, WrapperController);

                _get(Object.getPrototypeOf(WrapperController.prototype), 'constructor', this).call(this, location, context);
                this.location = this.location || location;
                this.context = this.context || context;
            }

            // history apis

            _createClass(WrapperController, [{
                key: 'goReplace',
                value: function goReplace(targetPath) {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goReplace', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goReplace', this).call(this, targetPath);
                    }
                    history.replace(targetPath);
                }
            }, {
                key: 'goTo',
                value: function goTo(targetPath) {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goTo', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goTo', this).call(this, targetPath);
                    }
                    history.push(targetPath);
                }
            }, {
                key: 'goIndex',
                value: function goIndex(index) {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goIndex', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goIndex', this).call(this, index);
                    }
                    history.go(index);
                }
            }, {
                key: 'goBack',
                value: function goBack() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goBack', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goBack', this).call(this);
                    }
                    history.goBack();
                }
            }, {
                key: 'goForward',
                value: function goForward() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goForward', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goForward', this).call(this);
                    }
                    history.goForward();
                }

                // update view
            }, {
                key: 'refreshView',
                value: function refreshView() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'refreshView', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'refreshView', this).call(this);
                    }
                    return renderToContainer(this.render());
                }

                // get container node
            }, {
                key: 'getContainer',
                value: function getContainer() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'getContainer', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'getContainer', this).call(this);
                    }
                    return _getContainer();
                }

                // clear container
            }, {
                key: 'clearContainer',
                value: function clearContainer() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'clearContainer', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'clearContainer', this).call(this);
                    }
                    return _clearContainer();
                }
            }]);

            return WrapperController;
        })(Controller);

        controllers[pattern] = WrapperController;
        return WrapperController;
    }

    function createInitController(location) {
        return function initController(Controller) {
            if (currentLocation !== location) {
                return;
            }
            if (currentController) {
                destroyController();
            }
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
        return viewEngine.render(component, _getContainer());
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
            listeners[i](location);
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
        var unsubscribe = undefined;
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
    var create = _shareHistory2['default'][settings.type];
    create = _shareHistory2['default'].useBasename(create);
    create = _shareHistory2['default'].useBeforeUnload(create);
    create = _shareHistory2['default'].useQueries(create);
    return create(settings);
}
module.exports = exports['default'];