/*!
 * create-app.js v0.1.1
 * (c) 2016 Jade Gu
 * Released under the MIT License.
 */
'use strict';

var pathToRegexp = require('path-to-regexp');
pathToRegexp = 'default' in pathToRegexp ? pathToRegexp['default'] : pathToRegexp;
var createHistory = require('create-history/lib/createBrowserHistory');
createHistory = 'default' in createHistory ? createHistory['default'] : createHistory;
var createHashHistory = require('create-history/lib/createHashHistory');
createHashHistory = 'default' in createHashHistory ? createHashHistory['default'] : createHashHistory;
var useQueries = require('create-history/lib/useQueries');
useQueries = 'default' in useQueries ? useQueries['default'] : useQueries;
var useBeforeUnload = require('create-history/lib/useBeforeUnload');
useBeforeUnload = 'default' in useBeforeUnload ? useBeforeUnload['default'] : useBeforeUnload;
var useBasename = require('create-history/lib/useBasename');
useBasename = 'default' in useBasename ? useBasename['default'] : useBasename;

var babelHelpers = {};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
function isThenable(obj) {
    return obj != null && typeof obj.then === 'function';
}

function identity(obj) {
    return obj;
}

function extend(to, from) {
    if (!from) {
        return to;
    }
    var keys = Object.keys(from);
    var i = keys.length;
    while (i--) {
        to[keys[i]] = from[keys[i]];
    }
    return to;
}

if (!Object.freeze) {
    Object.freeze = identity;
}

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
    var finalRoute = extend({}, route);
    var keys = finalRoute.keys = [];
    finalRoute.regexp = pathToRegexp(finalRoute.path, keys);
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

var defaultAppSettings = {
	container: '#container',
	basename: '',
	context: {},
	type: 'createHistory'
};

var render = function render(html, container) {
  container.innerHTML = html;
  return container;
};


var defaultViewEngine = Object.freeze({
  render: render
});

var History = {
	createHistory: createHistory,
	createHashHistory: createHashHistory,
	useQueries: useQueries,
	useBeforeUnload: useBeforeUnload,
	useBasename: useBasename
};

var uid = 0;
function createApp(appSettings) {
    var finalAppSettings = extend({ viewEngine: defaultViewEngine }, defaultAppSettings);

    extend(finalAppSettings, appSettings);

    var routes = finalAppSettings.routes;
    var viewEngine = finalAppSettings.viewEngine;
    var loader = finalAppSettings.loader;
    var context = finalAppSettings.context;
    var container = finalAppSettings.container;

    var history = createHistory$1(finalAppSettings);
    var matcher = createMatcher(routes);
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
            if (isThenable(result)) {
                return result.then(initController);
            } else {
                return result;
            }
        }

        if (controllerType === 'function') {
            var result = controller(location, loader);
            if (isThenable(result)) {
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
            babelHelpers.inherits(WrapperController, _Controller);

            function WrapperController(location, context) {
                babelHelpers.classCallCheck(this, WrapperController);

                _Controller.call(this, location, context);
                this.location = this.location || location;
                this.context = this.context || context;
            }

            // history apis

            WrapperController.prototype.goReplace = function goReplace(targetPath) {
                if (_Controller.prototype.goReplace) {
                    _Controller.prototype.goReplace.call(this, targetPath);
                }
                history.replace(targetPath);
            };

            WrapperController.prototype.goTo = function goTo(targetPath) {
                if (_Controller.prototype.goTo) {
                    _Controller.prototype.goTo.call(this, targetPath);
                }
                history.push(targetPath);
            };

            WrapperController.prototype.goIndex = function goIndex(index) {
                if (_Controller.prototype.goIndex) {
                    _Controller.prototype.goIndex.call(this, index);
                }
                history.go(index);
            };

            WrapperController.prototype.goBack = function goBack() {
                if (_Controller.prototype.goBack) {
                    _Controller.prototype.goBack.call(this);
                }
                history.goBack();
            };

            WrapperController.prototype.goForward = function goForward() {
                if (_Controller.prototype.goForward) {
                    _Controller.prototype.goForward.call(this);
                }
                history.goForward();
            };

            // update view

            WrapperController.prototype.refreshView = function refreshView() {
                if (_Controller.prototype.refreshView) {
                    _Controller.prototype.refreshView.call(this);
                }
                return renderToContainer(this.render());
            };

            // get container node

            WrapperController.prototype.getContainer = function getContainer() {
                if (_Controller.prototype.getContainer) {
                    _Controller.prototype.getContainer.call(this);
                }
                return _getContainer();
            };

            // clear container

            WrapperController.prototype.clearContainer = function clearContainer() {
                if (_Controller.prototype.clearContainer) {
                    _Controller.prototype.clearContainer.call(this);
                }
                return _clearContainer();
            };

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
            } else if (isThenable(component)) {
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
            if (isThenable(result)) {
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

function createHistory$1(settings) {
    var create = History[settings.type];
    create = History.useBasename(create);
    create = History.useBeforeUnload(create);
    create = History.useQueries(create);
    return create(settings);
}

module.exports = createApp;