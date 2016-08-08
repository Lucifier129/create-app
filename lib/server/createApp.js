/**
 * createApp at server
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

var _createHistoryLibCreateMemoryHistory = require('create-history/lib/createMemoryHistory');

var _createHistoryLibCreateMemoryHistory2 = _interopRequireDefault(_createHistoryLibCreateMemoryHistory);

function createApp(appSettings) {
    var finalAppSettings = _.extend({ viewEngine: defaultViewEngine }, _shareConstant.defaultAppSettings);

    _.extend(finalAppSettings, appSettings);

    var routes = finalAppSettings.routes;
    var viewEngine = finalAppSettings.viewEngine;
    var loader = finalAppSettings.loader;
    var context = finalAppSettings.context;

    var matcher = (0, _shareCreateMatcher2['default'])(routes);
    var history = createHistory(finalAppSettings);

    function render(requestPath, callback) {
        var location = history.createLocation(requestPath);
        var matches = matcher(location.pathname);

        if (!matches) {
            callback(new Error('Did not match any route with path:' + requestPath));
            return;
        }

        var path = matches.path;
        var params = matches.params;
        var controller = matches.controller;

        location.pattern = path;
        location.params = params;

        var initController = createInitController(location, callback);
        var controllerType = typeof controller;

        // handle path string
        if (controllerType === 'string') {
            var result = loader(controller, initController, location);
            if (_.isThenable(result)) {
                return result.then(initController, callback);
            } else {
                return result;
            }
        }

        // handle factory function
        if (controllerType === 'function') {
            var result = controller(location, loader);
            if (_.isThenable(result)) {
                return result.then(initController, callback);
            } else {
                return initController(result);
            }
        }
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
                    return render(targetPath);
                }
            }, {
                key: 'goTo',
                value: function goTo(targetPath) {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goTo', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goTo', this).call(this, targetPath);
                    }
                    return render(targetPath);
                }
            }, {
                key: 'goIndex',
                value: function goIndex(index) {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goIndex', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goIndex', this).call(this, index);
                    }
                }
            }, {
                key: 'goBack',
                value: function goBack() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goBack', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goBack', this).call(this);
                    }
                }
            }, {
                key: 'goForward',
                value: function goForward() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'goForward', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'goForward', this).call(this);
                    }
                }
            }, {
                key: 'refreshView',
                value: function refreshView() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'refreshView', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'refreshView', this).call(this);
                    }
                }
            }, {
                key: 'getContainer',
                value: function getContainer() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'getContainer', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'getContainer', this).call(this);
                    }
                }
            }, {
                key: 'clearContainer',
                value: function clearContainer() {
                    if (_get(Object.getPrototypeOf(WrapperController.prototype), 'clearContainer', this)) {
                        _get(Object.getPrototypeOf(WrapperController.prototype), 'clearContainer', this).call(this);
                    }
                }
            }]);

            return WrapperController;
        })(Controller);

        controllers[pattern] = WrapperController;
        return WrapperController;
    }

    function createInitController(location, callback) {
        return function initController(Controller) {
            var FinalController = getController(location.pattern, Controller);
            var controller = new FinalController(location, context);
            var component = controller.init();

            if (_.isThenable(component)) {
                var promise = component.then(renderToString);
                if (callback) {
                    return promise.then(function (result) {
                        return callback(null, result);
                    }, callback);
                }
                return promise;
            }

            var result = renderToString(component);
            if (callback) {
                callback(null, result);
            }
            return result;
        };
    }

    function renderToString(component) {
        return viewEngine.render(component);
    }

    function publicRender(requestPath, callback) {
        try {
            return render(requestPath, callback);
        } catch (error) {
            callback(error);
        }
    }

    return {
        render: publicRender,
        history: history
    };
}

function createHistory(settings) {
    var create = _createHistoryLibCreateMemoryHistory2['default'];
    create = _shareHistory2['default'].useBasename(create);
    create = _shareHistory2['default'].useQueries(create);
    return create(settings);
}
module.exports = exports['default'];