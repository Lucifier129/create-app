/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + ({"1":"./simple-spa/dest/detail","2":"./simple-spa/dest/home","3":"./simple-spa/dest/list"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/examples/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createAppClient = __webpack_require__(1);

	var _createAppClient2 = _interopRequireDefault(_createAppClient);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _routes = __webpack_require__(34);

	var _routes2 = _interopRequireDefault(_routes);

	var _config = __webpack_require__(35);

	var _config2 = _interopRequireDefault(_config);

	__webpack_require__(36);

	var _history = __webpack_require__(38);

	var History = _interopRequireWildcard(_history);

	var webpackLoader = function webpackLoader(url, initController) {
	    var load = __webpack_require__(40)(url);
	    load(function (module) {
	        var Controller = module['default'] || module;
	        initController(Controller);
	    });
	};

	var viewEngine = {
	    render: function render(component, container) {
	        return _reactDom2['default'].render(component, container);
	    }
	};

	var app = (0, _createAppClient2['default'])(_extends({}, _config2['default'], {
	    routes: _routes2['default'],
	    loader: webpackLoader,
	    viewEngine: viewEngine
	}));

	app.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createApp = __webpack_require__(2);

	var _createApp2 = _interopRequireDefault(_createApp);

	exports['default'] = _createApp2['default'];
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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

	var _shareUtil = __webpack_require__(3);

	var _ = _interopRequireWildcard(_shareUtil);

	var _shareCreateMatcher = __webpack_require__(4);

	var _shareCreateMatcher2 = _interopRequireDefault(_shareCreateMatcher);

	var _shareConstant = __webpack_require__(7);

	var _viewEngine = __webpack_require__(8);

	var defaultViewEngine = _interopRequireWildcard(_viewEngine);

	var _shareHistory = __webpack_require__(9);

	var _shareHistory2 = _interopRequireDefault(_shareHistory);

	function createApp(appSettings) {
	    var finalAppSettings = _.extend({ viewEngine: defaultViewEngine }, _shareConstant.defaultAppSettings);

	    _.extend(finalAppSettings, appSettings);

	    var routes = finalAppSettings.routes;
	    var viewEngine = finalAppSettings.viewEngine;
	    var loader = finalAppSettings.loader;
	    var context = finalAppSettings.context;
	    var container = finalAppSettings.container;

	    var history = window.$history = createHistory(finalAppSettings);
	    var matcher = (0, _shareCreateMatcher2['default'])(routes);
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

	        var controllerType = typeof controller;

	        location.pattern = path;
	        location.params = params;

	        var initController = createInitController(location);

	        if (controllerType === 'string') {
	            var result = loader(controller, initController);
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

	    function start() {
	        unlisten = history.listen(render);
	        render(history.getCurrentLocation());
	    }

	    function stop() {
	        if (unlisten) {
	            unlisten();
	            unlisten = null;
	        }
	        destroyController();
	    }

	    return {
	        start: start,
	        stop: stop,
	        render: render,
	        listen: history.listen
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	// util

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.isFn = isFn;
	exports.isThenable = isThenable;
	exports.invoke = invoke;
	exports.noop = noop;
	exports.identity = identity;
	exports.extend = extend;
	exports.getUid = getUid;
	var emptyList = [];

	exports.emptyList = emptyList;

	function isFn(obj) {
	    return typeof obj === 'function';
	}

	function isThenable(obj) {
	    return obj != null && isFn(obj.then);
	}

	function invoke(fn) {
	    return fn();
	}

	var isArr = Array.isArray;

	exports.isArr = isArr;

	function noop() {}

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

	var uid = 0;

	function getUid() {
	    return ++uid;
	}

	if (!Object.freeze) {
	    Object.freeze = identity;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = createMatcher;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _pathToRegexp = __webpack_require__(5);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	var _util = __webpack_require__(3);

	var _ = _interopRequireWildcard(_util);

	function createMatcher(routes) {
	    var finalRoutes = routes.map(createRoute);
	    var routelength = finalRoutes.length;

	    return function matcher(pathname) {
	        var finalPathname = cleanPath(pathname);
	        for (var i = 0; i < routelength; i++) {
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
	    finalRoute.regexp = (0, _pathToRegexp2['default'])(finalRoute.path, keys);
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
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(6)

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: escapeGroup(pattern)
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }

	  return attachKeys(re, keys)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }

	  return new RegExp('^' + route, flags(options))
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []

	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys)
	    keys = []
	  } else if (!options) {
	    options = {}
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
	  key/value configs
	*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var isClient = typeof window !== 'undefined';
	exports.isClient = isClient;
	var isServer = !isClient;
	exports.isServer = isServer;
	var defaultAppSettings = {
		basename: '',
		context: {},
		type: 'createHistory'
	};
	exports.defaultAppSettings = defaultAppSettings;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * default view engine for client
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _shareUtil = __webpack_require__(3);

	var render = function render(html, container) {
	  container.innerHTML = html;
	  return container;
	};
	exports.render = render;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * custom history import
	 */

	// HTML5 history
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _historyLibCreateBrowserHistory = __webpack_require__(10);

	var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

	// Hash history

	var _historyLibCreateHashHistory = __webpack_require__(25);

	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

	// query support

	var _historyLibUseQueries = __webpack_require__(27);

	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);

	// beforeunload support

	var _historyLibUseBeforeUnload = __webpack_require__(31);

	var _historyLibUseBeforeUnload2 = _interopRequireDefault(_historyLibUseBeforeUnload);

	// basename support

	var _historyLibUseBasename = __webpack_require__(32);

	var _historyLibUseBasename2 = _interopRequireDefault(_historyLibUseBasename);

	exports['default'] = {
		createHistory: _historyLibCreateBrowserHistory2['default'],
		createHashHistory: _historyLibCreateHashHistory2['default'],
		useQueries: _historyLibUseQueries2['default'],
		useBeforeUnload: _historyLibUseBeforeUnload2['default'],
		useBasename: _historyLibUseBasename2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(12);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(13);

	var _BrowserProtocol = __webpack_require__(14);

	var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);

	var _RefreshProtocol = __webpack_require__(21);

	var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);

	var _DOMUtils = __webpack_require__(19);

	var _createHistory = __webpack_require__(22);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve clean URLs. You can force this
	 * behavior using { forceRefresh: true } in options.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

	  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
	  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;

	  var getUserConfirmation = Protocol.getUserConfirmation;
	  var getCurrentLocation = Protocol.getCurrentLocation;
	  var pushLocation = Protocol.pushLocation;
	  var replaceLocation = Protocol.replaceLocation;
	  var go = Protocol.go;


	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));

	  var listenerCount = 0,
	      stopListener = void 0;

	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);

	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopListener();
	    };
	  };

	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };

	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen
	  });
	};

	exports.default = createBrowserHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout.call(null, timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout.call(null, drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;

	var _LocationUtils = __webpack_require__(15);

	var _DOMUtils = __webpack_require__(19);

	var _DOMStateStorage = __webpack_require__(20);

	var _PathUtils = __webpack_require__(16);

	/* eslint-disable no-alert */


	var PopStateEvent = 'popstate';

	var _createLocation = function _createLocation(historyState) {
	  var key = historyState && historyState.key;

	  return (0, _LocationUtils.createLocation)({
	    pathname: window.location.pathname,
	    search: window.location.search,
	    hash: window.location.hash,
	    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
	  }, undefined, key);
	};

	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  var historyState = void 0;
	  try {
	    historyState = window.history.state || {};
	  } catch (error) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/mjackson/history/pull/289
	    historyState = {};
	  }

	  return _createLocation(historyState);
	};

	var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
	  return callback(window.confirm(message));
	};

	var startListener = exports.startListener = function startListener(listener) {
	  var handlePopState = function handlePopState(event) {
	    if (event.state !== undefined) // Ignore extraneous popstate events in WebKit
	      listener(_createLocation(event.state));
	  };

	  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);
	  };
	};

	var updateLocation = function updateLocation(location, updateState) {
	  var state = location.state;
	  var key = location.key;


	  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);

	  updateState({ key: key }, (0, _PathUtils.createPath)(location));
	};

	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.pushState(state, null, path);
	  });
	};

	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.replaceState(state, null, path);
	  });
	};

	var go = exports.go = function go(n) {
	  if (n) window.history.go(n);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(12);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _PathUtils = __webpack_require__(16);

	var _Actions = __webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createQuery = exports.createQuery = function createQuery(props) {
	  return _extends(Object.create(null), props);
	};

	var createLocation = exports.createLocation = function createLocation() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;

	  var pathname = object.pathname || '/';
	  var search = object.search || '';
	  var hash = object.hash || '';
	  var state = object.state;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	};

	var isDate = function isDate(object) {
	  return Object.prototype.toString.call(object) === '[object Date]';
	};

	var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
	  if (a === b) return true;

	  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);

	  if (typeofA !== typeofB) return false;

	  !(typeofA !== 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;

	  // Not the same object, but same type.
	  if (typeofA === 'object') {
	    !!(isDate(a) && isDate(b)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;

	    if (!Array.isArray(a)) return Object.keys(a).every(function (key) {
	      return statesAreEqual(a[key], b[key]);
	    });

	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return statesAreEqual(item, b[index]);
	    });
	  }

	  // All other serializable types (string, number, boolean)
	  // should be strict equal.
	  return false;
	};

	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.key === b.key &&
	  // a.action === b.action && // Different action !== location change.
	  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = exports.isAbsolutePath = undefined;

	var _warning = __webpack_require__(17);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isAbsolutePath = exports.isAbsolutePath = function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	};

	var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
	  var _parsePath = parsePath(path);

	  var pathname = _parsePath.pathname;
	  var search = _parsePath.search;
	  var hash = _parsePath.hash;


	  return createPath({
	    pathname: pathname,
	    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
	    hash: hash
	  });
	};

	var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
	  var _parsePath2 = parsePath(path);

	  var pathname = _parsePath2.pathname;
	  var search = _parsePath2.search;
	  var hash = _parsePath2.hash;


	  return createPath({
	    pathname: pathname,
	    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
	      return prefix === '?' ? prefix : suffix;
	    }),
	    hash: hash
	  });
	};

	var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
	  var _parsePath3 = parsePath(path);

	  var search = _parsePath3.search;

	  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
	  return match && match[1];
	};

	var extractPath = function extractPath(string) {
	  var match = string.match(/^(https?:)?\/\/[^\/]*/);
	  return match == null ? string : string.substring(match[0].length);
	};

	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	};

	var createPath = exports.createPath = function createPath(location) {
	  if (location == null || typeof location === 'string') return location;

	  var basename = location.basename;
	  var pathname = location.pathname;
	  var search = location.search;
	  var hash = location.hash;

	  var path = (basename || '') + pathname;

	  if (search && search !== '?') path += search;

	  if (hash) path += hash;

	  return path;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	var PUSH = exports.PUSH = 'PUSH';

	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = exports.REPLACE = 'REPLACE';

	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = exports.POP = 'POP';

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};

	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;

	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

	  return window.history && 'pushState' in window.history;
	};

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.readState = exports.saveState = undefined;

	var _warning = __webpack_require__(17);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR']; /* eslint-disable no-empty */


	var SecurityError = 'SecurityError';
	var KeyPrefix = '@@History/';

	var createKey = function createKey(key) {
	  return KeyPrefix + key;
	};

	var saveState = exports.saveState = function saveState(key, state) {
	  if (!window.sessionStorage) {
	    // Session storage is not available or hidden.
	    // sessionStorage is undefined in Internet Explorer when served via file protocol.
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;
	    return;
	  }

	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;

	      return;
	    }

	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;

	      return;
	    }

	    throw error;
	  }
	};

	var readState = exports.readState = function readState(key) {
	  var json = void 0;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;

	      return undefined;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return undefined;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

	var _BrowserProtocol = __webpack_require__(14);

	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});

	var _LocationUtils = __webpack_require__(15);

	var _PathUtils = __webpack_require__(16);

	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  return (0, _LocationUtils.createLocation)(window.location);
	};

	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  window.location.href = (0, _PathUtils.createPath)(location);
	  return false; // Don't update location
	};

	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  window.location.replace((0, _PathUtils.createPath)(location));
	  return false; // Don't update location
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AsyncUtils = __webpack_require__(23);

	var _PathUtils = __webpack_require__(16);

	var _runTransitionHook = __webpack_require__(24);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _Actions = __webpack_require__(18);

	var _LocationUtils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var createHistory = function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var getUserConfirmation = options.getUserConfirmation;
	  var pushLocation = options.pushLocation;
	  var replaceLocation = options.replaceLocation;
	  var go = options.go;
	  var keyLength = options.keyLength;


	  var currentLocation = void 0;
	  var pendingLocation = void 0;
	  var beforeListeners = [];
	  var listeners = [];
	  var allKeys = [];

	  var getCurrentIndex = function getCurrentIndex() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);

	    if (currentLocation) return allKeys.indexOf(currentLocation.key);

	    return -1;
	  };

	  var updateLocation = function updateLocation(nextLocation) {
	    currentLocation = nextLocation;

	    var currentIndex = getCurrentIndex();

	    if (currentLocation.action === _Actions.PUSH) {
	      allKeys = [].concat(_toConsumableArray(allKeys.slice(0, currentIndex + 1)), [currentLocation.key]);
	    } else if (currentLocation.action === _Actions.REPLACE) {
	      allKeys[currentIndex] = currentLocation.key;
	    }

	    listeners.forEach(function (listener) {
	      return listener(currentLocation);
	    });
	  };

	  var listenBefore = function listenBefore(listener) {
	    beforeListeners.push(listener);

	    return function () {
	      return beforeListeners = beforeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };

	  var listen = function listen(listener) {
	    listeners.push(listener);

	    return function () {
	      return listeners = listeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };

	  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
	    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
	      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
	        return result != null ? done(result) : next();
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          return callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  };

	  var transitionTo = function transitionTo(nextLocation) {
	    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation

	      pendingLocation = null;

	      if (ok) {
	        // Treat PUSH to same path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = (0, _PathUtils.createPath)(currentLocation);
	          var nextPath = (0, _PathUtils.createPath)(nextLocation);

	          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }

	        if (nextLocation.action === _Actions.POP) {
	          updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.PUSH) {
	          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.REPLACE) {
	          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
	        }
	      } else if (currentLocation && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(currentLocation.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
	      }
	    });
	  };

	  var push = function push(input) {
	    return transitionTo(createLocation(input, _Actions.PUSH));
	  };

	  var replace = function replace(input) {
	    return transitionTo(createLocation(input, _Actions.REPLACE));
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength || 6);
	  };

	  var createHref = function createHref(location) {
	    return (0, _PathUtils.createPath)(location);
	  };

	  var createLocation = function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	    return (0, _LocationUtils.createLocation)(location, action, key);
	  };

	  return {
	    getCurrentLocation: getCurrentLocation,
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: _PathUtils.createPath,
	    createHref: createHref,
	    createLocation: createLocation
	  };
	};

	exports.default = createHistory;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var isSync = false,
	      hasNext = false,
	      doneArgs = void 0;

	  var done = function done() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    isDone = true;

	    if (isSync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = args;
	      return;
	    }

	    callback.apply(undefined, args);
	  };

	  var next = function next() {
	    if (isDone) return;

	    hasNext = true;

	    if (isSync) return; // Iterate instead of recursing if possible.

	    isSync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work(currentTurn++, next, done);
	    }

	    isSync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(undefined, _toConsumableArray(doneArgs));
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  };

	  next();
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _warning = __webpack_require__(17);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var runTransitionHook = function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
	  }
	};

	exports.default = runTransitionHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _warning = __webpack_require__(17);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(12);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(13);

	var _DOMUtils = __webpack_require__(19);

	var _HashProtocol = __webpack_require__(26);

	var HashProtocol = _interopRequireWildcard(_HashProtocol);

	var _createHistory = __webpack_require__(22);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DefaultQueryKey = '_k';

	var createHashHistory = function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;

	  var queryKey = options.queryKey;


	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(queryKey !== false, 'Using { queryKey: false } no longer works. Instead, just don\'t ' + 'use location state if you don\'t want a key in your URL query string') : void 0;

	  if (typeof queryKey !== 'string') queryKey = DefaultQueryKey;

	  var getUserConfirmation = HashProtocol.getUserConfirmation;


	  var getCurrentLocation = function getCurrentLocation() {
	    return HashProtocol.getCurrentLocation(queryKey);
	  };

	  var pushLocation = function pushLocation(location) {
	    return HashProtocol.pushLocation(location, queryKey);
	  };

	  var replaceLocation = function replaceLocation(location) {
	    return HashProtocol.replaceLocation(location, queryKey);
	  };

	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: HashProtocol.go
	  }));

	  var listenerCount = 0,
	      stopListener = void 0;

	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = HashProtocol.startListener(history.transitionTo, queryKey);

	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopListener();
	    };
	  };

	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };

	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };

	  var goIsSupportedWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

	  var go = function go(n) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;

	    history.go(n);
	  };

	  var createHref = function createHref(path) {
	    return '#' + history.createHref(path);
	  };

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    go: go,
	    createHref: createHref
	  });
	};

	exports.default = createHashHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

	var _BrowserProtocol = __webpack_require__(14);

	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});

	var _warning = __webpack_require__(17);

	var _warning2 = _interopRequireDefault(_warning);

	var _LocationUtils = __webpack_require__(15);

	var _DOMUtils = __webpack_require__(19);

	var _DOMStateStorage = __webpack_require__(20);

	var _PathUtils = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HashChangeEvent = 'hashchange';

	var getHashPath = function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var index = href.indexOf('#');
	  return index === -1 ? '' : href.substring(index + 1);
	};

	var pushHashPath = function pushHashPath(path) {
	  return window.location.hash = path;
	};

	var replaceHashPath = function replaceHashPath(path) {
	  var i = window.location.href.indexOf('#');

	  window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path);
	};

	var ensureSlash = function ensureSlash() {
	  var path = getHashPath();

	  if ((0, _PathUtils.isAbsolutePath)(path)) return true;

	  replaceHashPath('/' + path);

	  return false;
	};

	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation(queryKey) {
	  var path = getHashPath();
	  var key = (0, _PathUtils.getQueryStringValueFromPath)(path, queryKey);

	  var state = void 0;
	  if (key) {
	    path = (0, _PathUtils.stripQueryStringValueFromPath)(path, queryKey);
	    state = (0, _DOMStateStorage.readState)(key);
	  }

	  var init = (0, _PathUtils.parsePath)(path);
	  init.state = state;

	  return (0, _LocationUtils.createLocation)(init, undefined, key);
	};

	var prevLocation = void 0;

	var startListener = exports.startListener = function startListener(listener, queryKey) {
	  var handleHashChange = function handleHashChange() {
	    if (!ensureSlash()) return; // Hash path must always begin with a /

	    var currentLocation = getCurrentLocation(queryKey);

	    if (prevLocation && currentLocation.key && prevLocation.key === currentLocation.key) return; // Ignore extraneous hashchange events

	    prevLocation = currentLocation;

	    listener(currentLocation);
	  };

	  ensureSlash();
	  (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);

	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	  };
	};

	var updateLocation = function updateLocation(location, queryKey, updateHash) {
	  var state = location.state;
	  var key = location.key;

	  var path = (0, _PathUtils.createPath)(location);

	  if (state !== undefined) {
	    path = (0, _PathUtils.addQueryStringValueToPath)(path, queryKey, key);
	    (0, _DOMStateStorage.saveState)(key, state);
	  }

	  prevLocation = location;

	  updateHash(path);
	};

	var pushLocation = exports.pushLocation = function pushLocation(location, queryKey) {
	  return updateLocation(location, queryKey, function (path) {
	    if (getHashPath() !== path) {
	      pushHashPath(path);
	    } else {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'You cannot PUSH the same path using hash history') : void 0;
	    }
	  });
	};

	var replaceLocation = exports.replaceLocation = function replaceLocation(location, queryKey) {
	  return updateLocation(location, queryKey, function (path) {
	    if (getHashPath() !== path) replaceHashPath(path);
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _queryString = __webpack_require__(28);

	var _runTransitionHook = __webpack_require__(24);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _LocationUtils = __webpack_require__(15);

	var _PathUtils = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultStringifyQuery = function defaultStringifyQuery(query) {
	  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
	};

	var defaultParseQueryString = _queryString.parse;

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	var useQueries = function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;


	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    var decodeQuery = function decodeQuery(location) {
	      if (!location) return location;

	      if (location.query == null) location.query = parseQueryString(location.search.substring(1));

	      return location;
	    };

	    var encodeQuery = function encodeQuery(location, query) {
	      if (query == null) return location;

	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var queryString = stringifyQuery(query);
	      var search = queryString ? '?' + queryString : '';

	      return _extends({}, object, {
	        search: search
	      });
	    };

	    // Override all read methods with query-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return decodeQuery(history.getCurrentLocation());
	    };

	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, decodeQuery(location), callback);
	      });
	    };

	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(decodeQuery(location));
	      });
	    };

	    // Override all write methods with query-aware versions.
	    var push = function push(location) {
	      return history.push(encodeQuery(location, location.query));
	    };

	    var replace = function replace(location) {
	      return history.replace(encodeQuery(location, location.query));
	    };

	    var createPath = function createPath(location) {
	      return history.createPath(encodeQuery(location, location.query));
	    };

	    var createHref = function createHref(location) {
	      return history.createHref(encodeQuery(location, location.query));
	    };

	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var newLocation = history.createLocation.apply(history, [encodeQuery(location, location.query)].concat(args));

	      if (location.query) newLocation.query = (0, _LocationUtils.createQuery)(location.query);

	      return decodeQuery(newLocation);
	    };

	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};

	exports.default = useQueries;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(29);
	var objectAssign = __webpack_require__(30);

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}

		return value;
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});

		return ret;
	};

	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};

		opts = objectAssign(defaults, opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(12);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _DOMUtils = __webpack_require__(19);

	var _ExecutionEnvironment = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var startListener = function startListener(getPromptMessage) {
	  var handleBeforeUnload = function handleBeforeUnload(event) {
	    var message = getPromptMessage();

	    if (typeof message === 'string') {
	      (event || window.event).returnValue = message;
	      return message;
	    }

	    return undefined;
	  };

	  (0, _DOMUtils.addEventListener)(window, 'beforeunload', handleBeforeUnload);

	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, 'beforeunload', handleBeforeUnload);
	  };
	};

	/**
	 * Returns a new createHistory function that can be used to create
	 * history objects that know how to use the beforeunload event in web
	 * browsers to cancel navigation.
	 */
	var useBeforeUnload = function useBeforeUnload(createHistory) {
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'useBeforeUnload only works in DOM environments') : (0, _invariant2.default)(false) : void 0;

	  return function (options) {
	    var history = createHistory(options);

	    var listeners = [];
	    var stopListener = void 0;

	    var getPromptMessage = function getPromptMessage() {
	      var message = void 0;
	      for (var i = 0, len = listeners.length; message == null && i < len; ++i) {
	        message = listeners[i].call();
	      }return message;
	    };

	    var listenBeforeUnload = function listenBeforeUnload(listener) {
	      if (listeners.push(listener) === 1) stopListener = startListener(getPromptMessage);

	      return function () {
	        listeners = listeners.filter(function (item) {
	          return item !== listener;
	        });

	        if (listeners.length === 0 && stopListener) {
	          stopListener();
	          stopListener = null;
	        }
	      };
	    };

	    return _extends({}, history, {
	      listenBeforeUnload: listenBeforeUnload
	    });
	  };
	};

	exports.default = useBeforeUnload;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _runTransitionHook = __webpack_require__(24);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _PathUtils = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var useBasename = function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);
	    var basename = options.basename;


	    var addBasename = function addBasename(location) {
	      if (!location) return location;

	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    };

	    var prependBasename = function prependBasename(location) {
	      if (!basename) return location;

	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var pname = object.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	      return _extends({}, object, {
	        pathname: pathname
	      });
	    };

	    // Override all read methods with basename-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return addBasename(history.getCurrentLocation());
	    };

	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, addBasename(location), callback);
	      });
	    };

	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(addBasename(location));
	      });
	    };

	    // Override all write methods with basename-aware versions.
	    var push = function push(location) {
	      return history.push(prependBasename(location));
	    };

	    var replace = function replace(location) {
	      return history.replace(prependBasename(location));
	    };

	    var createPath = function createPath(location) {
	      return history.createPath(prependBasename(location));
	    };

	    var createHref = function createHref(location) {
	      return history.createHref(prependBasename(location));
	    };

	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    };

	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};

	exports.default = useBasename;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/*!
	 * react-lite.js v0.15.14
	 * (c) 2016 Jade Gu
	 * Released under the MIT License.
	 */
	'use strict';

	var HTML_KEY = 'dangerouslySetInnerHTML';
	var SVGNamespaceURI = 'http://www.w3.org/2000/svg';
	var COMPONENT_ID = 'liteid';
	var VELEMENT = 2;
	var VSTATELESS = 3;
	var VCOMPONENT = 4;
	var VCOMMENT = 5;

	/**
	 * current stateful component's refs property
	 * will attach to every vnode created by calling component.render method
	 */
	var refs = null;

	function createVnode(vtype, type, props, key, ref) {
	    var vnode = {
	        vtype: vtype,
	        type: type,
	        props: props,
	        refs: refs,
	        key: key,
	        ref: ref
	    };
	    if (vtype === VSTATELESS || vtype === VCOMPONENT) {
	        vnode.uid = getUid();
	    }
	    return vnode;
	}

	function initVnode(vnode, parentContext, namespaceURI) {
	    var vtype = vnode.vtype;

	    var node = null;
	    if (!vtype) {
	        // init text
	        node = document.createTextNode(vnode);
	    } else if (vtype === VELEMENT) {
	        // init element
	        node = initVelem(vnode, parentContext, namespaceURI);
	    } else if (vtype === VCOMPONENT) {
	        // init state component
	        node = initVcomponent(vnode, parentContext, namespaceURI);
	    } else if (vtype === VSTATELESS) {
	        // init stateless component
	        node = initVstateless(vnode, parentContext, namespaceURI);
	    } else if (vtype === VCOMMENT) {
	        // init comment
	        node = document.createComment('react-empty: ' + vnode.uid);
	    }
	    return node;
	}

	function updateVnode(vnode, newVnode, node, parentContext) {
	    var vtype = vnode.vtype;

	    if (vtype === VCOMPONENT) {
	        return updateVcomponent(vnode, newVnode, node, parentContext);
	    }

	    if (vtype === VSTATELESS) {
	        return updateVstateless(vnode, newVnode, node, parentContext);
	    }

	    // ignore VCOMMENT and other vtypes
	    if (vtype !== VELEMENT) {
	        return node;
	    }

	    var oldHtml = vnode.props[HTML_KEY] && vnode.props[HTML_KEY].__html;
	    if (oldHtml != null) {
	        updateVelem(vnode, newVnode, node, parentContext);
	        initVchildren(newVnode, node, parentContext);
	    } else {
	        updateVChildren(vnode, newVnode, node, parentContext);
	        updateVelem(vnode, newVnode, node, parentContext);
	    }
	    return node;
	}

	function updateVChildren(vnode, newVnode, node, parentContext) {
	    var patches = {
	        removes: [],
	        updates: [],
	        creates: []
	    };
	    diffVchildren(patches, vnode, newVnode, node, parentContext);
	    flatEach(patches.removes, applyDestroy);
	    flatEach(patches.updates, applyUpdate);
	    flatEach(patches.creates, applyCreate);
	}

	function applyUpdate(data) {
	    if (!data) {
	        return;
	    }
	    var vnode = data.vnode;
	    var newNode = data.node;

	    // update
	    if (!data.shouldIgnore) {
	        if (!vnode.vtype) {
	            newNode.replaceData(0, newNode.length, data.newVnode);
	            // newNode.nodeValue = data.newVnode
	        } else if (vnode.vtype === VELEMENT) {
	                updateVelem(vnode, data.newVnode, newNode, data.parentContext);
	            } else if (vnode.vtype === VSTATELESS) {
	                newNode = updateVstateless(vnode, data.newVnode, newNode, data.parentContext);
	            } else if (vnode.vtype === VCOMPONENT) {
	                newNode = updateVcomponent(vnode, data.newVnode, newNode, data.parentContext);
	            }
	    }

	    // re-order
	    var currentNode = newNode.parentNode.childNodes[data.index];
	    if (currentNode !== newNode) {
	        newNode.parentNode.insertBefore(newNode, currentNode);
	    }
	    return newNode;
	}

	function applyDestroy(data) {
	    destroyVnode(data.vnode, data.node);
	    data.node.parentNode.removeChild(data.node);
	}

	function applyCreate(data) {
	    var node = initVnode(data.vnode, data.parentContext, data.parentNode.namespaceURI);
	    data.parentNode.insertBefore(node, data.parentNode.childNodes[data.index]);
	}

	/**
	 * Only vnode which has props.children need to call destroy function
	 * to check whether subTree has component that need to call lify-cycle method and release cache.
	 */

	function destroyVnode(vnode, node) {
	    var vtype = vnode.vtype;

	    if (vtype === VELEMENT) {
	        // destroy element
	        destroyVelem(vnode, node);
	    } else if (vtype === VCOMPONENT) {
	        // destroy state component
	        destroyVcomponent(vnode, node);
	    } else if (vtype === VSTATELESS) {
	        // destroy stateless component
	        destroyVstateless(vnode, node);
	    }
	}

	function initVelem(velem, parentContext, namespaceURI) {
	    var type = velem.type;
	    var props = velem.props;

	    var node = null;

	    if (type === 'svg' || namespaceURI === SVGNamespaceURI) {
	        node = document.createElementNS(SVGNamespaceURI, type);
	        namespaceURI = SVGNamespaceURI;
	    } else {
	        node = document.createElement(type);
	    }

	    initVchildren(velem, node, parentContext);

	    var isCustomComponent = type.indexOf('-') >= 0 || props.is != null;
	    setProps(node, props, isCustomComponent);

	    attachRef(velem.refs, velem.ref, node);

	    return node;
	}

	function initVchildren(velem, node, parentContext) {
	    var vchildren = node.vchildren = getFlattenChildren(velem);
	    var namespaceURI = node.namespaceURI;
	    for (var i = 0, len = vchildren.length; i < len; i++) {
	        node.appendChild(initVnode(vchildren[i], parentContext, namespaceURI));
	    }
	}

	function getFlattenChildren(vnode) {
	    var children = vnode.props.children;

	    var vchildren = [];
	    if (isArr(children)) {
	        flatEach(children, collectChild, vchildren);
	    } else {
	        collectChild(children, vchildren);
	    }
	    return vchildren;
	}

	function collectChild(child, children) {
	    if (child != null && typeof child !== 'boolean') {
	        if (!child.vtype) {
	            // convert immutablejs data
	            if (child.toJS) {
	                child = child.toJS();
	                if (isArr(child)) {
	                    flatEach(child, collectChild, children);
	                } else {
	                    collectChild(child, children);
	                }
	                return;
	            }
	            child = '' + child;
	        }
	        children[children.length] = child;
	    }
	}

	function diffVchildren(patches, vnode, newVnode, node, parentContext) {
	    var childNodes = node.childNodes;
	    var vchildren = node.vchildren;

	    var newVchildren = node.vchildren = getFlattenChildren(newVnode);
	    var vchildrenLen = vchildren.length;
	    var newVchildrenLen = newVchildren.length;

	    if (vchildrenLen === 0) {
	        if (newVchildrenLen > 0) {
	            for (var i = 0; i < newVchildrenLen; i++) {
	                patches.creates.push({
	                    vnode: newVchildren[i],
	                    parentNode: node,
	                    parentContext: parentContext,
	                    index: i
	                });
	            }
	        }
	        return;
	    } else if (newVchildrenLen === 0) {
	        for (var i = 0; i < vchildrenLen; i++) {
	            patches.removes.push({
	                vnode: vchildren[i],
	                node: childNodes[i]
	            });
	        }
	        return;
	    }

	    var updates = Array(newVchildrenLen);
	    var removes = null;
	    var creates = null;

	    // isEqual
	    for (var i = 0; i < vchildrenLen; i++) {
	        var _vnode = vchildren[i];
	        for (var j = 0; j < newVchildrenLen; j++) {
	            if (updates[j]) {
	                continue;
	            }
	            var _newVnode = newVchildren[j];
	            if (_vnode === _newVnode) {
	                var shouldIgnore = true;
	                if (parentContext) {
	                    if (_vnode.vtype === VCOMPONENT || _vnode.vtype === VSTATELESS) {
	                        if (_vnode.type.contextTypes) {
	                            shouldIgnore = false;
	                        }
	                    }
	                }
	                updates[j] = {
	                    shouldIgnore: shouldIgnore,
	                    vnode: _vnode,
	                    newVnode: _newVnode,
	                    node: childNodes[i],
	                    parentContext: parentContext,
	                    index: j
	                };
	                vchildren[i] = null;
	                break;
	            }
	        }
	    }

	    // isSimilar
	    for (var i = 0; i < vchildrenLen; i++) {
	        var _vnode2 = vchildren[i];
	        if (_vnode2 === null) {
	            continue;
	        }
	        var shouldRemove = true;
	        for (var j = 0; j < newVchildrenLen; j++) {
	            if (updates[j]) {
	                continue;
	            }
	            var _newVnode2 = newVchildren[j];
	            if (_newVnode2.type === _vnode2.type && _newVnode2.key === _vnode2.key && _newVnode2.refs === _vnode2.refs) {
	                updates[j] = {
	                    vnode: _vnode2,
	                    newVnode: _newVnode2,
	                    node: childNodes[i],
	                    parentContext: parentContext,
	                    index: j
	                };
	                shouldRemove = false;
	                break;
	            }
	        }
	        if (shouldRemove) {
	            if (!removes) {
	                removes = [];
	            }
	            removes.push({
	                vnode: _vnode2,
	                node: childNodes[i]
	            });
	        }
	    }

	    for (var i = 0; i < newVchildrenLen; i++) {
	        var item = updates[i];
	        if (!item) {
	            if (!creates) {
	                creates = [];
	            }
	            creates.push({
	                vnode: newVchildren[i],
	                parentNode: node,
	                parentContext: parentContext,
	                index: i
	            });
	        } else if (item.vnode.vtype === VELEMENT) {
	            diffVchildren(patches, item.vnode, item.newVnode, item.node, item.parentContext);
	        }
	    }

	    if (removes) {
	        patches.removes.push(removes);
	    }
	    if (creates) {
	        patches.creates.push(creates);
	    }
	    patches.updates.push(updates);
	}

	function updateVelem(velem, newVelem, node) {
	    var isCustomComponent = velem.type.indexOf('-') >= 0 || velem.props.is != null;
	    patchProps(node, velem.props, newVelem.props, isCustomComponent);
	    if (velem.ref !== newVelem.ref) {
	        detachRef(velem.refs, velem.ref);
	        attachRef(newVelem.refs, newVelem.ref, node);
	    }
	    return node;
	}

	function destroyVelem(velem, node) {
	    var props = velem.props;
	    var vchildren = node.vchildren;
	    var childNodes = node.childNodes;

	    for (var i = 0, len = vchildren.length; i < len; i++) {
	        destroyVnode(vchildren[i], childNodes[i]);
	    }
	    detachRef(velem.refs, velem.ref);
	    node.eventStore = node.vchildren = null;
	}

	function initVstateless(vstateless, parentContext, namespaceURI) {
	    var vnode = renderVstateless(vstateless, parentContext);
	    var node = initVnode(vnode, parentContext, namespaceURI);
	    node.cache = node.cache || {};
	    node.cache[vstateless.uid] = vnode;
	    return node;
	}

	function updateVstateless(vstateless, newVstateless, node, parentContext) {
	    var uid = vstateless.uid;
	    var vnode = node.cache[uid];
	    delete node.cache[uid];
	    var newVnode = renderVstateless(newVstateless, parentContext);
	    var newNode = compareTwoVnodes(vnode, newVnode, node, parentContext);
	    newNode.cache = newNode.cache || {};
	    newNode.cache[newVstateless.uid] = newVnode;
	    if (newNode !== node) {
	        syncCache(newNode.cache, node.cache, newNode);
	    }
	    return newNode;
	}

	function destroyVstateless(vstateless, node) {
	    var uid = vstateless.uid;
	    var vnode = node.cache[uid];
	    delete node.cache[uid];
	    destroyVnode(vnode, node);
	}

	function renderVstateless(vstateless, parentContext) {
	    var factory = vstateless.type;
	    var props = vstateless.props;

	    var componentContext = getContextByTypes(parentContext, factory.contextTypes);
	    var vnode = factory(props, componentContext);
	    if (vnode && vnode.render) {
	        vnode = vnode.render();
	    }
	    if (vnode === null || vnode === false) {
	        vnode = createVnode(VCOMMENT);
	    } else if (!vnode || !vnode.vtype) {
	        throw new Error('@' + factory.name + '#render:You may have returned undefined, an array or some other invalid object');
	    }
	    return vnode;
	}

	function initVcomponent(vcomponent, parentContext, namespaceURI) {
	    var Component = vcomponent.type;
	    var props = vcomponent.props;
	    var uid = vcomponent.uid;

	    var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	    var component = new Component(props, componentContext);
	    var updater = component.$updater;
	    var cache = component.$cache;

	    cache.parentContext = parentContext;
	    updater.isPending = true;
	    component.props = component.props || props;
	    component.context = component.context || componentContext;
	    if (component.componentWillMount) {
	        component.componentWillMount();
	        component.state = updater.getState();
	    }
	    var vnode = renderComponent(component);
	    var node = initVnode(vnode, getChildContext(component, parentContext), namespaceURI);
	    node.cache = node.cache || {};
	    node.cache[uid] = component;
	    cache.vnode = vnode;
	    cache.node = node;
	    cache.isMounted = true;
	    pendingComponents.push(component);
	    attachRef(vcomponent.refs, vcomponent.ref, component);
	    return node;
	}

	function updateVcomponent(vcomponent, newVcomponent, node, parentContext) {
	    var uid = vcomponent.uid;
	    var component = node.cache[uid];
	    var updater = component.$updater;
	    var cache = component.$cache;
	    var Component = newVcomponent.type;
	    var nextProps = newVcomponent.props;

	    var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	    delete node.cache[uid];
	    node.cache[newVcomponent.uid] = component;
	    cache.parentContext = parentContext;
	    if (component.componentWillReceiveProps) {
	        updater.isPending = true;
	        component.componentWillReceiveProps(nextProps, componentContext);
	        updater.isPending = false;
	    }
	    updater.emitUpdate(nextProps, componentContext);

	    if (vcomponent.ref !== newVcomponent.ref) {
	        detachRef(vcomponent.refs, vcomponent.ref);
	        attachRef(newVcomponent.refs, newVcomponent.ref, component);
	    }
	    return cache.node;
	}

	function destroyVcomponent(vcomponent, node) {
	    var uid = vcomponent.uid;
	    var component = node.cache[uid];
	    var cache = component.$cache;
	    delete node.cache[uid];
	    detachRef(vcomponent.refs, vcomponent.ref);
	    component.setState = component.forceUpdate = noop;
	    if (component.componentWillUnmount) {
	        component.componentWillUnmount();
	    }
	    destroyVnode(cache.vnode, node);
	    delete component.setState;
	    cache.isMounted = false;
	    cache.node = cache.parentContext = cache.vnode = component.refs = component.context = null;
	}

	function getContextByTypes(curContext, contextTypes) {
	    var context = {};
	    if (!contextTypes || !curContext) {
	        return context;
	    }
	    for (var key in contextTypes) {
	        if (contextTypes.hasOwnProperty(key)) {
	            context[key] = curContext[key];
	        }
	    }
	    return context;
	}

	function renderComponent(component, parentContext) {
	    refs = component.refs;
	    var vnode = component.render();
	    if (vnode === null || vnode === false) {
	        vnode = createVnode(VCOMMENT);
	    } else if (!vnode || !vnode.vtype) {
	        throw new Error('@' + component.constructor.name + '#render:You may have returned undefined, an array or some other invalid object');
	    }
	    refs = null;
	    return vnode;
	}

	function getChildContext(component, parentContext) {
	    if (component.getChildContext) {
	        var curContext = component.getChildContext();
	        if (curContext) {
	            parentContext = extend(extend({}, parentContext), curContext);
	        }
	    }
	    return parentContext;
	}

	var pendingComponents = [];

	function clearPendingComponents() {
	    var len = pendingComponents.length;
	    if (!len) {
	        return;
	    }
	    var components = pendingComponents;
	    pendingComponents = [];
	    var i = -1;
	    while (len--) {
	        var component = components[++i];
	        var updater = component.$updater;
	        if (component.componentDidMount) {
	            component.componentDidMount();
	        }
	        updater.isPending = false;
	        updater.emitUpdate();
	    }
	}

	function compareTwoVnodes(vnode, newVnode, node, parentContext) {
	    var newNode = node;
	    if (newVnode == null) {
	        // remove
	        destroyVnode(vnode, node);
	        node.parentNode.removeChild(node);
	    } else if (vnode.type !== newVnode.type || vnode.key !== newVnode.key) {
	        // replace
	        destroyVnode(vnode, node);
	        newNode = initVnode(newVnode, parentContext, node.namespaceURI);
	        node.parentNode.replaceChild(newNode, node);
	    } else if (vnode !== newVnode || parentContext) {
	        // same type and same key -> update
	        newNode = updateVnode(vnode, newVnode, node, parentContext);
	    }
	    return newNode;
	}

	function getDOMNode() {
	    return this;
	}

	function attachRef(refs, refKey, refValue) {
	    if (!refs || refKey == null || !refValue) {
	        return;
	    }
	    if (refValue.nodeName && !refValue.getDOMNode) {
	        // support react v0.13 style: this.refs.myInput.getDOMNode()
	        refValue.getDOMNode = getDOMNode;
	    }
	    if (isFn(refKey)) {
	        refKey(refValue);
	    } else {
	        refs[refKey] = refValue;
	    }
	}

	function detachRef(refs, refKey) {
	    if (!refs || refKey == null) {
	        return;
	    }
	    if (isFn(refKey)) {
	        refKey(null);
	    } else {
	        delete refs[refKey];
	    }
	}

	function syncCache(cache, oldCache, node) {
	    for (var key in oldCache) {
	        if (!oldCache.hasOwnProperty(key)) {
	            continue;
	        }
	        var value = oldCache[key];
	        cache[key] = value;
	        // is component, update component.$cache.node
	        if (value.forceUpdate) {
	            value.$cache.node = node;
	        }
	    }
	}

	var updateQueue = {
		updaters: [],
		isPending: false,
		add: function add(updater) {
			this.updaters.push(updater);
		},
		batchUpdate: function batchUpdate() {
			if (this.isPending) {
				return;
			}
			this.isPending = true;
			/*
	   each updater.update may add new updater to updateQueue
	   clear them with a loop
	   event bubbles from bottom-level to top-level
	   reverse the updater order can merge some props and state and reduce the refresh times
	   see Updater.update method below to know why
	  */
			var updaters = this.updaters;

			var updater = undefined;
			while (updater = updaters.pop()) {
				updater.updateComponent();
			}
			this.isPending = false;
		}
	};

	function Updater(instance) {
		this.instance = instance;
		this.pendingStates = [];
		this.pendingCallbacks = [];
		this.isPending = false;
		this.nextProps = this.nextContext = null;
		this.clearCallbacks = this.clearCallbacks.bind(this);
	}

	Updater.prototype = {
		emitUpdate: function emitUpdate(nextProps, nextContext) {
			this.nextProps = nextProps;
			this.nextContext = nextContext;
			// receive nextProps!! should update immediately
			nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this);
		},
		updateComponent: function updateComponent() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var nextProps = this.nextProps;
			var nextContext = this.nextContext;

			if (nextProps || pendingStates.length > 0) {
				nextProps = nextProps || instance.props;
				nextContext = nextContext || instance.context;
				this.nextProps = this.nextContext = null;
				// merge the nextProps and nextState and update by one time
				shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
			}
		},
		addState: function addState(nextState) {
			if (nextState) {
				this.pendingStates.push(nextState);
				if (!this.isPending) {
					this.emitUpdate();
				}
			}
		},
		replaceState: function replaceState(nextState) {
			var pendingStates = this.pendingStates;

			pendingStates.pop();
			// push special params to point out should replace state
			pendingStates.push([nextState]);
		},
		getState: function getState() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var state = instance.state;
			var props = instance.props;

			if (pendingStates.length) {
				state = extend({}, state);
				pendingStates.forEach(function (nextState) {
					// replace state
					if (isArr(nextState)) {
						state = extend({}, nextState[0]);
						return;
					}
					if (isFn(nextState)) {
						nextState = nextState.call(instance, state, props);
					}
					extend(state, nextState);
				});
				pendingStates.length = 0;
			}
			return state;
		},
		clearCallbacks: function clearCallbacks() {
			var pendingCallbacks = this.pendingCallbacks;
			var instance = this.instance;

			if (pendingCallbacks.length > 0) {
				this.pendingCallbacks = [];
				pendingCallbacks.forEach(function (callback) {
					return callback.call(instance);
				});
			}
		},
		addCallback: function addCallback(callback) {
			if (isFn(callback)) {
				this.pendingCallbacks.push(callback);
			}
		}
	};
	function Component(props, context) {
		this.$updater = new Updater(this);
		this.$cache = { isMounted: false };
		this.props = props;
		this.state = {};
		this.refs = {};
		this.context = context;
	}

	Component.prototype = {
		constructor: Component,
		// getChildContext: _.noop,
		// componentWillUpdate: _.noop,
		// componentDidUpdate: _.noop,
		// componentWillReceiveProps: _.noop,
		// componentWillMount: _.noop,
		// componentDidMount: _.noop,
		// componentWillUnmount: _.noop,
		// shouldComponentUpdate(nextProps, nextState) {
		// 	return true
		// },
		forceUpdate: function forceUpdate(callback) {
			var $updater = this.$updater;
			var $cache = this.$cache;
			var props = this.props;
			var state = this.state;
			var context = this.context;

			if ($updater.isPending || !$cache.isMounted) {
				return;
			}
			var nextProps = $cache.props || props;
			var nextState = $cache.state || state;
			var nextContext = $cache.context || {};
			var parentContext = $cache.parentContext;
			var node = $cache.node;
			var vnode = $cache.vnode;
			$cache.props = $cache.state = $cache.context = null;
			$updater.isPending = true;
			if (this.componentWillUpdate) {
				this.componentWillUpdate(nextProps, nextState, nextContext);
			}
			this.state = nextState;
			this.props = nextProps;
			this.context = nextContext;
			var newVnode = renderComponent(this);
			var newNode = compareTwoVnodes(vnode, newVnode, node, getChildContext(this, parentContext));
			if (newNode !== node) {
				newNode.cache = newNode.cache || {};
				syncCache(newNode.cache, node.cache, newNode);
			}
			$cache.vnode = newVnode;
			$cache.node = newNode;
			clearPendingComponents();
			if (this.componentDidUpdate) {
				this.componentDidUpdate(props, state, context);
			}
			if (callback) {
				callback.call(this);
			}
			$updater.isPending = false;
			$updater.emitUpdate();
		},
		setState: function setState(nextState, callback) {
			var $updater = this.$updater;

			$updater.addCallback(callback);
			$updater.addState(nextState);
		},
		replaceState: function replaceState(nextState, callback) {
			var $updater = this.$updater;

			$updater.addCallback(callback);
			$updater.replaceState(nextState);
		},
		getDOMNode: function getDOMNode() {
			var node = this.$cache.node;
			return node && node.nodeName === '#comment' ? null : node;
		},
		isMounted: function isMounted() {
			return this.$cache.isMounted;
		}
	};

	function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
		var shouldComponentUpdate = true;
		if (component.shouldComponentUpdate) {
			shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
		}
		if (shouldComponentUpdate === false) {
			component.props = nextProps;
			component.state = nextState;
			component.context = nextContext || {};
			return;
		}
		var cache = component.$cache;
		cache.props = nextProps;
		cache.state = nextState;
		cache.context = nextContext || {};
		component.forceUpdate(callback);
	}

	// event config
	var notBubbleEvents = {
		onmouseleave: 1,
		onmouseenter: 1,
		onload: 1,
		onunload: 1,
		onscroll: 1,
		onfocus: 1,
		onblur: 1,
		onrowexit: 1,
		onbeforeunload: 1,
		onstop: 1,
		ondragdrop: 1,
		ondragenter: 1,
		ondragexit: 1,
		ondraggesture: 1,
		ondragover: 1,
		oncontextmenu: 1
	};

	function getEventName(key) {
		key = key === 'onDoubleClick' ? 'ondblclick' : key;
		return key.toLowerCase();
	}

	// Mobile Safari does not fire properly bubble click events on
	// non-interactive elements, which means delegated click listeners do not
	// fire. The workaround for this bug involves attaching an empty click
	// listener on the target node.
	var inMobile = ('ontouchstart' in document);
	var emptyFunction = function emptyFunction() {};
	var ON_CLICK_KEY = 'onclick';

	var eventTypes = {};

	function addEvent(elem, eventType, listener) {
		eventType = getEventName(eventType);

		if (notBubbleEvents[eventType] === 1) {
			elem[eventType] = listener;
			return;
		}

		var eventStore = elem.eventStore || (elem.eventStore = {});
		eventStore[eventType] = listener;

		if (!eventTypes[eventType]) {
			// onclick -> click
			document.addEventListener(eventType.substr(2), dispatchEvent, false);
			eventTypes[eventType] = true;
		}

		if (inMobile && eventType === ON_CLICK_KEY) {
			elem.addEventListener('click', emptyFunction, false);
		}

		var nodeName = elem.nodeName;

		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			addEvent(elem, 'oninput', listener);
		}
	}

	function removeEvent(elem, eventType) {
		eventType = getEventName(eventType);
		if (notBubbleEvents[eventType] === 1) {
			elem[eventType] = null;
			return;
		}

		var eventStore = elem.eventStore || (elem.eventStore = {});
		delete eventStore[eventType];

		if (inMobile && eventType === ON_CLICK_KEY) {
			elem.removeEventListener('click', emptyFunction, false);
		}

		var nodeName = elem.nodeName;

		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			delete eventStore['oninput'];
		}
	}

	function dispatchEvent(event) {
		var target = event.target;
		var type = event.type;

		var eventType = 'on' + type;
		var syntheticEvent = undefined;

		updateQueue.isPending = true;
		while (target) {
			var _target = target;
			var eventStore = _target.eventStore;

			var listener = eventStore && eventStore[eventType];
			if (!listener) {
				target = target.parentNode;
				continue;
			}
			if (!syntheticEvent) {
				syntheticEvent = createSyntheticEvent(event);
			}
			syntheticEvent.currentTarget = target;
			listener.call(target, syntheticEvent);
			if (syntheticEvent.$cancalBubble) {
				break;
			}
			target = target.parentNode;
		}
		updateQueue.isPending = false;
		updateQueue.batchUpdate();
	}

	function createSyntheticEvent(nativeEvent) {
		var syntheticEvent = {};
		var cancalBubble = function cancalBubble() {
			return syntheticEvent.$cancalBubble = true;
		};
		syntheticEvent.nativeEvent = nativeEvent;
		syntheticEvent.persist = noop;
		for (var key in nativeEvent) {
			if (typeof nativeEvent[key] !== 'function') {
				syntheticEvent[key] = nativeEvent[key];
			} else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
				syntheticEvent[key] = cancalBubble;
			} else {
				syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
			}
		}
		return syntheticEvent;
	}

	function setStyle(elemStyle, styles) {
	    for (var styleName in styles) {
	        if (styles.hasOwnProperty(styleName)) {
	            setStyleValue(elemStyle, styleName, styles[styleName]);
	        }
	    }
	}

	function removeStyle(elemStyle, styles) {
	    for (var styleName in styles) {
	        if (styles.hasOwnProperty(styleName)) {
	            elemStyle[styleName] = '';
	        }
	    }
	}

	function patchStyle(elemStyle, style, newStyle) {
	    if (style === newStyle) {
	        return;
	    }
	    if (!newStyle && style) {
	        removeStyle(elemStyle, style);
	        return;
	    } else if (newStyle && !style) {
	        setStyle(elemStyle, newStyle);
	        return;
	    }

	    for (var key in style) {
	        if (newStyle.hasOwnProperty(key)) {
	            if (newStyle[key] !== style[key]) {
	                setStyleValue(elemStyle, key, newStyle[key]);
	            }
	        } else {
	            elemStyle[key] = '';
	        }
	    }
	    for (var key in newStyle) {
	        if (!style.hasOwnProperty(key)) {
	            setStyleValue(elemStyle, key, newStyle[key]);
	        }
	    }
	}

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	    animationIterationCount: 1,
	    borderImageOutset: 1,
	    borderImageSlice: 1,
	    borderImageWidth: 1,
	    boxFlex: 1,
	    boxFlexGroup: 1,
	    boxOrdinalGroup: 1,
	    columnCount: 1,
	    flex: 1,
	    flexGrow: 1,
	    flexPositive: 1,
	    flexShrink: 1,
	    flexNegative: 1,
	    flexOrder: 1,
	    gridRow: 1,
	    gridColumn: 1,
	    fontWeight: 1,
	    lineClamp: 1,
	    lineHeight: 1,
	    opacity: 1,
	    order: 1,
	    orphans: 1,
	    tabSize: 1,
	    widows: 1,
	    zIndex: 1,
	    zoom: 1,

	    // SVG-related properties
	    fillOpacity: 1,
	    floodOpacity: 1,
	    stopOpacity: 1,
	    strokeDasharray: 1,
	    strokeDashoffset: 1,
	    strokeMiterlimit: 1,
	    strokeOpacity: 1,
	    strokeWidth: 1
	};

	function prefixKey(prefix, key) {
	    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	Object.keys(isUnitlessNumber).forEach(function (prop) {
	    prefixes.forEach(function (prefix) {
	        isUnitlessNumber[prefixKey(prefix, prop)] = 1;
	    });
	});

	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	function setStyleValue(elemStyle, styleName, styleValue) {

	    if (!isUnitlessNumber[styleName] && RE_NUMBER.test(styleValue)) {
	        elemStyle[styleName] = styleValue + 'px';
	        return;
	    }

	    if (styleName === 'float') {
	        styleName = 'cssFloat';
	    }

	    if (styleValue == null || typeof styleValue === 'boolean') {
	        styleValue = '';
	    }

	    elemStyle[styleName] = styleValue;
	}

	var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040';

	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');

	var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));
	// will merge some data in properties below
	var properties = {};

	/**
	 * Mapping from normalized, camelcased property names to a configuration that
	 * specifies how the associated DOM property should be accessed or rendered.
	 */
	var MUST_USE_PROPERTY = 0x1;
	var HAS_BOOLEAN_VALUE = 0x4;
	var HAS_NUMERIC_VALUE = 0x8;
	var HAS_POSITIVE_NUMERIC_VALUE = 0x10 | 0x8;
	var HAS_OVERLOADED_BOOLEAN_VALUE = 0x20;

	// html config
	var HTMLDOMPropertyConfig = {
	    props: {
	        /**
	         * Standard Properties
	         */
	        accept: 0,
	        acceptCharset: 0,
	        accessKey: 0,
	        action: 0,
	        allowFullScreen: HAS_BOOLEAN_VALUE,
	        allowTransparency: 0,
	        alt: 0,
	        async: HAS_BOOLEAN_VALUE,
	        autoComplete: 0,
	        autoFocus: HAS_BOOLEAN_VALUE,
	        autoPlay: HAS_BOOLEAN_VALUE,
	        capture: HAS_BOOLEAN_VALUE,
	        cellPadding: 0,
	        cellSpacing: 0,
	        charSet: 0,
	        challenge: 0,
	        checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        cite: 0,
	        classID: 0,
	        className: 0,
	        cols: HAS_POSITIVE_NUMERIC_VALUE,
	        colSpan: 0,
	        content: 0,
	        contentEditable: 0,
	        contextMenu: 0,
	        controls: HAS_BOOLEAN_VALUE,
	        coords: 0,
	        crossOrigin: 0,
	        data: 0, // For `<object />` acts as `src`.
	        dateTime: 0,
	        'default': HAS_BOOLEAN_VALUE,
	        // not in regular react, they did it in other way
	        defaultValue: MUST_USE_PROPERTY,
	        // not in regular react, they did it in other way
	        defaultChecked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        defer: HAS_BOOLEAN_VALUE,
	        dir: 0,
	        disabled: HAS_BOOLEAN_VALUE,
	        download: HAS_OVERLOADED_BOOLEAN_VALUE,
	        draggable: 0,
	        encType: 0,
	        form: 0,
	        formAction: 0,
	        formEncType: 0,
	        formMethod: 0,
	        formNoValidate: HAS_BOOLEAN_VALUE,
	        formTarget: 0,
	        frameBorder: 0,
	        headers: 0,
	        height: 0,
	        hidden: HAS_BOOLEAN_VALUE,
	        high: 0,
	        href: 0,
	        hrefLang: 0,
	        htmlFor: 0,
	        httpEquiv: 0,
	        icon: 0,
	        id: 0,
	        inputMode: 0,
	        integrity: 0,
	        is: 0,
	        keyParams: 0,
	        keyType: 0,
	        kind: 0,
	        label: 0,
	        lang: 0,
	        list: 0,
	        loop: HAS_BOOLEAN_VALUE,
	        low: 0,
	        manifest: 0,
	        marginHeight: 0,
	        marginWidth: 0,
	        max: 0,
	        maxLength: 0,
	        media: 0,
	        mediaGroup: 0,
	        method: 0,
	        min: 0,
	        minLength: 0,
	        // Caution; `option.selected` is not updated if `select.multiple` is
	        // disabled with `removeAttribute`.
	        multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        name: 0,
	        nonce: 0,
	        noValidate: HAS_BOOLEAN_VALUE,
	        open: HAS_BOOLEAN_VALUE,
	        optimum: 0,
	        pattern: 0,
	        placeholder: 0,
	        poster: 0,
	        preload: 0,
	        profile: 0,
	        radioGroup: 0,
	        readOnly: HAS_BOOLEAN_VALUE,
	        rel: 0,
	        required: HAS_BOOLEAN_VALUE,
	        reversed: HAS_BOOLEAN_VALUE,
	        role: 0,
	        rows: HAS_POSITIVE_NUMERIC_VALUE,
	        rowSpan: HAS_NUMERIC_VALUE,
	        sandbox: 0,
	        scope: 0,
	        scoped: HAS_BOOLEAN_VALUE,
	        scrolling: 0,
	        seamless: HAS_BOOLEAN_VALUE,
	        selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        shape: 0,
	        size: HAS_POSITIVE_NUMERIC_VALUE,
	        sizes: 0,
	        span: HAS_POSITIVE_NUMERIC_VALUE,
	        spellCheck: 0,
	        src: 0,
	        srcDoc: 0,
	        srcLang: 0,
	        srcSet: 0,
	        start: HAS_NUMERIC_VALUE,
	        step: 0,
	        style: 0,
	        summary: 0,
	        tabIndex: 0,
	        target: 0,
	        title: 0,
	        // Setting .type throws on non-<input> tags
	        type: 0,
	        useMap: 0,
	        value: MUST_USE_PROPERTY,
	        width: 0,
	        wmode: 0,
	        wrap: 0,

	        /**
	         * RDFa Properties
	         */
	        about: 0,
	        datatype: 0,
	        inlist: 0,
	        prefix: 0,
	        // property is also supported for OpenGraph in meta tags.
	        property: 0,
	        resource: 0,
	        'typeof': 0,
	        vocab: 0,

	        /**
	         * Non-standard Properties
	         */
	        // autoCapitalize and autoCorrect are supported in Mobile Safari for
	        // keyboard hints.
	        autoCapitalize: 0,
	        autoCorrect: 0,
	        // autoSave allows WebKit/Blink to persist values of input fields on page reloads
	        autoSave: 0,
	        // color is for Safari mask-icon link
	        color: 0,
	        // itemProp, itemScope, itemType are for
	        // Microdata support. See http://schema.org/docs/gs.html
	        itemProp: 0,
	        itemScope: HAS_BOOLEAN_VALUE,
	        itemType: 0,
	        // itemID and itemRef are for Microdata support as well but
	        // only specified in the WHATWG spec document. See
	        // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	        itemID: 0,
	        itemRef: 0,
	        // results show looking glass icon and recent searches on input
	        // search fields in WebKit/Blink
	        results: 0,
	        // IE-only attribute that specifies security restrictions on an iframe
	        // as an alternative to the sandbox attribute on IE<10
	        security: 0,
	        // IE-only attribute that controls focus behavior
	        unselectable: 0
	    },
	    attrNS: {},
	    domAttrs: {
	        acceptCharset: 'accept-charset',
	        className: 'class',
	        htmlFor: 'for',
	        httpEquiv: 'http-equiv'
	    },
	    domProps: {}
	};

	// svg config
	var xlink = 'http://www.w3.org/1999/xlink';
	var xml = 'http://www.w3.org/XML/1998/namespace';

	// We use attributes for everything SVG so let's avoid some duplication and run
	// code instead.
	// The following are all specified in the HTML config already so we exclude here.
	// - class (as className)
	// - color
	// - height
	// - id
	// - lang
	// - max
	// - media
	// - method
	// - min
	// - name
	// - style
	// - target
	// - type
	// - width
	var ATTRS = {
	    accentHeight: 'accent-height',
	    accumulate: 0,
	    additive: 0,
	    alignmentBaseline: 'alignment-baseline',
	    allowReorder: 'allowReorder',
	    alphabetic: 0,
	    amplitude: 0,
	    arabicForm: 'arabic-form',
	    ascent: 0,
	    attributeName: 'attributeName',
	    attributeType: 'attributeType',
	    autoReverse: 'autoReverse',
	    azimuth: 0,
	    baseFrequency: 'baseFrequency',
	    baseProfile: 'baseProfile',
	    baselineShift: 'baseline-shift',
	    bbox: 0,
	    begin: 0,
	    bias: 0,
	    by: 0,
	    calcMode: 'calcMode',
	    capHeight: 'cap-height',
	    clip: 0,
	    clipPath: 'clip-path',
	    clipRule: 'clip-rule',
	    clipPathUnits: 'clipPathUnits',
	    colorInterpolation: 'color-interpolation',
	    colorInterpolationFilters: 'color-interpolation-filters',
	    colorProfile: 'color-profile',
	    colorRendering: 'color-rendering',
	    contentScriptType: 'contentScriptType',
	    contentStyleType: 'contentStyleType',
	    cursor: 0,
	    cx: 0,
	    cy: 0,
	    d: 0,
	    decelerate: 0,
	    descent: 0,
	    diffuseConstant: 'diffuseConstant',
	    direction: 0,
	    display: 0,
	    divisor: 0,
	    dominantBaseline: 'dominant-baseline',
	    dur: 0,
	    dx: 0,
	    dy: 0,
	    edgeMode: 'edgeMode',
	    elevation: 0,
	    enableBackground: 'enable-background',
	    end: 0,
	    exponent: 0,
	    externalResourcesRequired: 'externalResourcesRequired',
	    fill: 0,
	    fillOpacity: 'fill-opacity',
	    fillRule: 'fill-rule',
	    filter: 0,
	    filterRes: 'filterRes',
	    filterUnits: 'filterUnits',
	    floodColor: 'flood-color',
	    floodOpacity: 'flood-opacity',
	    focusable: 0,
	    fontFamily: 'font-family',
	    fontSize: 'font-size',
	    fontSizeAdjust: 'font-size-adjust',
	    fontStretch: 'font-stretch',
	    fontStyle: 'font-style',
	    fontVariant: 'font-variant',
	    fontWeight: 'font-weight',
	    format: 0,
	    from: 0,
	    fx: 0,
	    fy: 0,
	    g1: 0,
	    g2: 0,
	    glyphName: 'glyph-name',
	    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
	    glyphOrientationVertical: 'glyph-orientation-vertical',
	    glyphRef: 'glyphRef',
	    gradientTransform: 'gradientTransform',
	    gradientUnits: 'gradientUnits',
	    hanging: 0,
	    horizAdvX: 'horiz-adv-x',
	    horizOriginX: 'horiz-origin-x',
	    ideographic: 0,
	    imageRendering: 'image-rendering',
	    'in': 0,
	    in2: 0,
	    intercept: 0,
	    k: 0,
	    k1: 0,
	    k2: 0,
	    k3: 0,
	    k4: 0,
	    kernelMatrix: 'kernelMatrix',
	    kernelUnitLength: 'kernelUnitLength',
	    kerning: 0,
	    keyPoints: 'keyPoints',
	    keySplines: 'keySplines',
	    keyTimes: 'keyTimes',
	    lengthAdjust: 'lengthAdjust',
	    letterSpacing: 'letter-spacing',
	    lightingColor: 'lighting-color',
	    limitingConeAngle: 'limitingConeAngle',
	    local: 0,
	    markerEnd: 'marker-end',
	    markerMid: 'marker-mid',
	    markerStart: 'marker-start',
	    markerHeight: 'markerHeight',
	    markerUnits: 'markerUnits',
	    markerWidth: 'markerWidth',
	    mask: 0,
	    maskContentUnits: 'maskContentUnits',
	    maskUnits: 'maskUnits',
	    mathematical: 0,
	    mode: 0,
	    numOctaves: 'numOctaves',
	    offset: 0,
	    opacity: 0,
	    operator: 0,
	    order: 0,
	    orient: 0,
	    orientation: 0,
	    origin: 0,
	    overflow: 0,
	    overlinePosition: 'overline-position',
	    overlineThickness: 'overline-thickness',
	    paintOrder: 'paint-order',
	    panose1: 'panose-1',
	    pathLength: 'pathLength',
	    patternContentUnits: 'patternContentUnits',
	    patternTransform: 'patternTransform',
	    patternUnits: 'patternUnits',
	    pointerEvents: 'pointer-events',
	    points: 0,
	    pointsAtX: 'pointsAtX',
	    pointsAtY: 'pointsAtY',
	    pointsAtZ: 'pointsAtZ',
	    preserveAlpha: 'preserveAlpha',
	    preserveAspectRatio: 'preserveAspectRatio',
	    primitiveUnits: 'primitiveUnits',
	    r: 0,
	    radius: 0,
	    refX: 'refX',
	    refY: 'refY',
	    renderingIntent: 'rendering-intent',
	    repeatCount: 'repeatCount',
	    repeatDur: 'repeatDur',
	    requiredExtensions: 'requiredExtensions',
	    requiredFeatures: 'requiredFeatures',
	    restart: 0,
	    result: 0,
	    rotate: 0,
	    rx: 0,
	    ry: 0,
	    scale: 0,
	    seed: 0,
	    shapeRendering: 'shape-rendering',
	    slope: 0,
	    spacing: 0,
	    specularConstant: 'specularConstant',
	    specularExponent: 'specularExponent',
	    speed: 0,
	    spreadMethod: 'spreadMethod',
	    startOffset: 'startOffset',
	    stdDeviation: 'stdDeviation',
	    stemh: 0,
	    stemv: 0,
	    stitchTiles: 'stitchTiles',
	    stopColor: 'stop-color',
	    stopOpacity: 'stop-opacity',
	    strikethroughPosition: 'strikethrough-position',
	    strikethroughThickness: 'strikethrough-thickness',
	    string: 0,
	    stroke: 0,
	    strokeDasharray: 'stroke-dasharray',
	    strokeDashoffset: 'stroke-dashoffset',
	    strokeLinecap: 'stroke-linecap',
	    strokeLinejoin: 'stroke-linejoin',
	    strokeMiterlimit: 'stroke-miterlimit',
	    strokeOpacity: 'stroke-opacity',
	    strokeWidth: 'stroke-width',
	    surfaceScale: 'surfaceScale',
	    systemLanguage: 'systemLanguage',
	    tableValues: 'tableValues',
	    targetX: 'targetX',
	    targetY: 'targetY',
	    textAnchor: 'text-anchor',
	    textDecoration: 'text-decoration',
	    textRendering: 'text-rendering',
	    textLength: 'textLength',
	    to: 0,
	    transform: 0,
	    u1: 0,
	    u2: 0,
	    underlinePosition: 'underline-position',
	    underlineThickness: 'underline-thickness',
	    unicode: 0,
	    unicodeBidi: 'unicode-bidi',
	    unicodeRange: 'unicode-range',
	    unitsPerEm: 'units-per-em',
	    vAlphabetic: 'v-alphabetic',
	    vHanging: 'v-hanging',
	    vIdeographic: 'v-ideographic',
	    vMathematical: 'v-mathematical',
	    values: 0,
	    vectorEffect: 'vector-effect',
	    version: 0,
	    vertAdvY: 'vert-adv-y',
	    vertOriginX: 'vert-origin-x',
	    vertOriginY: 'vert-origin-y',
	    viewBox: 'viewBox',
	    viewTarget: 'viewTarget',
	    visibility: 0,
	    widths: 0,
	    wordSpacing: 'word-spacing',
	    writingMode: 'writing-mode',
	    x: 0,
	    xHeight: 'x-height',
	    x1: 0,
	    x2: 0,
	    xChannelSelector: 'xChannelSelector',
	    xlinkActuate: 'xlink:actuate',
	    xlinkArcrole: 'xlink:arcrole',
	    xlinkHref: 'xlink:href',
	    xlinkRole: 'xlink:role',
	    xlinkShow: 'xlink:show',
	    xlinkTitle: 'xlink:title',
	    xlinkType: 'xlink:type',
	    xmlBase: 'xml:base',
	    xmlLang: 'xml:lang',
	    xmlSpace: 'xml:space',
	    y: 0,
	    y1: 0,
	    y2: 0,
	    yChannelSelector: 'yChannelSelector',
	    z: 0,
	    zoomAndPan: 'zoomAndPan'
	};

	var SVGDOMPropertyConfig = {
	    props: {},
	    attrNS: {
	        xlinkActuate: xlink,
	        xlinkArcrole: xlink,
	        xlinkHref: xlink,
	        xlinkRole: xlink,
	        xlinkShow: xlink,
	        xlinkTitle: xlink,
	        xlinkType: xlink,
	        xmlBase: xml,
	        xmlLang: xml,
	        xmlSpace: xml
	    },
	    domAttrs: {},
	    domProps: {}
	};

	Object.keys(ATTRS).map(function (key) {
	    SVGDOMPropertyConfig.props[key] = 0;
	    if (ATTRS[key]) {
	        SVGDOMPropertyConfig.domAttrs[key] = ATTRS[key];
	    }
	});

	// merge html and svg config into properties
	mergeConfigToProperties(HTMLDOMPropertyConfig);
	mergeConfigToProperties(SVGDOMPropertyConfig);

	function mergeConfigToProperties(config) {
	    var
	    // all react/react-lite supporting property names in here
	    props = config.props;
	    var
	    // attributes namespace in here
	    attrNS = config.attrNS;
	    var
	    // propName in props which should use to be dom-attribute in here
	    domAttrs = config.domAttrs;
	    var
	    // propName in props which should use to be dom-property in here
	    domProps = config.domProps;

	    for (var propName in props) {
	        if (!props.hasOwnProperty(propName)) {
	            continue;
	        }
	        var propConfig = props[propName];
	        properties[propName] = {
	            attributeName: domAttrs.hasOwnProperty(propName) ? domAttrs[propName] : propName.toLowerCase(),
	            propertyName: domProps.hasOwnProperty(propName) ? domProps[propName] : propName,
	            attributeNamespace: attrNS.hasOwnProperty(propName) ? attrNS[propName] : null,
	            mustUseProperty: checkMask(propConfig, MUST_USE_PROPERTY),
	            hasBooleanValue: checkMask(propConfig, HAS_BOOLEAN_VALUE),
	            hasNumericValue: checkMask(propConfig, HAS_NUMERIC_VALUE),
	            hasPositiveNumericValue: checkMask(propConfig, HAS_POSITIVE_NUMERIC_VALUE),
	            hasOverloadedBooleanValue: checkMask(propConfig, HAS_OVERLOADED_BOOLEAN_VALUE)
	        };
	    }
	}

	function checkMask(value, bitmask) {
	    return (value & bitmask) === bitmask;
	}

	/**
	 * Sets the value for a property on a node.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 * @param {*} value
	 */

	function setPropValue(node, name, value) {
	    var propInfo = properties.hasOwnProperty(name) && properties[name];
	    if (propInfo) {
	        // should delete value from dom
	        if (value == null || propInfo.hasBooleanValue && !value || propInfo.hasNumericValue && isNaN(value) || propInfo.hasPositiveNumericValue && value < 1 || propInfo.hasOverloadedBooleanValue && value === false) {
	            removePropValue(node, name);
	        } else if (propInfo.mustUseProperty) {
	            var propName = propInfo.propertyName;
	            // dom.value has side effect
	            if (propName !== 'value' || '' + node[propName] !== '' + value) {
	                node[propName] = value;
	            }
	        } else {
	            var attributeName = propInfo.attributeName;
	            var namespace = propInfo.attributeNamespace;

	            // `setAttribute` with objects becomes only `[object]` in IE8/9,
	            // ('' + value) makes it output the correct toString()-value.
	            if (namespace) {
	                node.setAttributeNS(namespace, attributeName, '' + value);
	            } else if (propInfo.hasBooleanValue || propInfo.hasOverloadedBooleanValue && value === true) {
	                node.setAttribute(attributeName, '');
	            } else {
	                node.setAttribute(attributeName, '' + value);
	            }
	        }
	    } else if (isCustomAttribute(name) && VALID_ATTRIBUTE_NAME_REGEX.test(name)) {
	        if (value == null) {
	            node.removeAttribute(name);
	        } else {
	            node.setAttribute(name, '' + value);
	        }
	    }
	}

	/**
	 * Deletes the value for a property on a node.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 */

	function removePropValue(node, name) {
	    var propInfo = properties.hasOwnProperty(name) && properties[name];
	    if (propInfo) {
	        if (propInfo.mustUseProperty) {
	            var propName = propInfo.propertyName;
	            if (propInfo.hasBooleanValue) {
	                node[propName] = false;
	            } else {
	                // dom.value accept string value has side effect
	                if (propName !== 'value' || '' + node[propName] !== '') {
	                    node[propName] = '';
	                }
	            }
	        } else {
	            node.removeAttribute(propInfo.attributeName);
	        }
	    } else if (isCustomAttribute(name)) {
	        node.removeAttribute(name);
	    }
	}

	function isFn(obj) {
	    return typeof obj === 'function';
	}

	var isArr = Array.isArray;

	function noop() {}

	function identity(obj) {
	    return obj;
	}

	function pipe(fn1, fn2) {
	    return function () {
	        fn1.apply(this, arguments);
	        return fn2.apply(this, arguments);
	    };
	}

	function flatEach(list, iteratee, a) {
	    var len = list.length;
	    var i = -1;

	    while (len--) {
	        var item = list[++i];
	        if (isArr(item)) {
	            flatEach(item, iteratee, a);
	        } else {
	            iteratee(item, a);
	        }
	    }
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

	var uid = 0;

	function getUid() {
	    return ++uid;
	}

	var EVENT_KEYS = /^on/i;

	function setProp(elem, key, value, isCustomComponent) {
	    if (EVENT_KEYS.test(key)) {
	        addEvent(elem, key, value);
	    } else if (key === 'style') {
	        setStyle(elem.style, value);
	    } else if (key === HTML_KEY) {
	        if (value && value.__html != null) {
	            elem.innerHTML = value.__html;
	        }
	    } else if (isCustomComponent) {
	        if (value == null) {
	            elem.removeAttribute(key);
	        } else {
	            elem.setAttribute(key, '' + value);
	        }
	    } else {
	        setPropValue(elem, key, value);
	    }
	}

	function removeProp(elem, key, oldValue, isCustomComponent) {
	    if (EVENT_KEYS.test(key)) {
	        removeEvent(elem, key);
	    } else if (key === 'style') {
	        removeStyle(elem.style, oldValue);
	    } else if (key === HTML_KEY) {
	        elem.innerHTML = '';
	    } else if (isCustomComponent) {
	        elem.removeAttribute(key);
	    } else {
	        removePropValue(elem, key);
	    }
	}

	function patchProp(elem, key, value, oldValue, isCustomComponent) {
	    if (key === 'value' || key === 'checked') {
	        oldValue = elem[key];
	    }
	    if (value === oldValue) {
	        return;
	    }
	    if (value === undefined) {
	        removeProp(elem, key, oldValue, isCustomComponent);
	        return;
	    }
	    if (key === 'style') {
	        patchStyle(elem.style, oldValue, value);
	    } else {
	        setProp(elem, key, value, isCustomComponent);
	    }
	}

	function setProps(elem, props, isCustomComponent) {
	    for (var key in props) {
	        if (key !== 'children') {
	            setProp(elem, key, props[key], isCustomComponent);
	        }
	    }
	}

	function patchProps(elem, props, newProps, isCustomComponent) {
	    for (var key in props) {
	        if (key !== 'children') {
	            if (newProps.hasOwnProperty(key)) {
	                patchProp(elem, key, newProps[key], props[key], isCustomComponent);
	            } else {
	                removeProp(elem, key, props[key], isCustomComponent);
	            }
	        }
	    }
	    for (var key in newProps) {
	        if (key !== 'children' && !props.hasOwnProperty(key)) {
	            setProp(elem, key, newProps[key], isCustomComponent);
	        }
	    }
	}

	if (!Object.freeze) {
	    Object.freeze = identity;
	}

	var pendingRendering = {};
	var vnodeStore = {};
	function renderTreeIntoContainer(vnode, container, callback, parentContext) {
		if (!vnode.vtype) {
			throw new Error('cannot render ' + vnode + ' to container');
		}
		var id = container[COMPONENT_ID] || (container[COMPONENT_ID] = getUid());
		var argsCache = pendingRendering[id];

		// component lify cycle method maybe call root rendering
		// should bundle them and render by only one time
		if (argsCache) {
			if (argsCache === true) {
				pendingRendering[id] = argsCache = { vnode: vnode, callback: callback, parentContext: parentContext };
			} else {
				argsCache.vnode = vnode;
				argsCache.parentContext = parentContext;
				if (argsCache.callback) {
					argsCache.callback = argsCache.callback ? pipe(argsCache.callback, callback) : callback;
				}
			}
			return;
		}

		pendingRendering[id] = true;
		var oldVnode = null;
		var rootNode = null;
		if (oldVnode = vnodeStore[id]) {
			rootNode = compareTwoVnodes(oldVnode, vnode, container.firstChild, parentContext);
		} else {
			rootNode = initVnode(vnode, parentContext, container.namespaceURI);
			var childNode = null;
			while (childNode = container.lastChild) {
				container.removeChild(childNode);
			}
			container.appendChild(rootNode);
		}
		vnodeStore[id] = vnode;
		var isPending = updateQueue.isPending;
		updateQueue.isPending = true;
		clearPendingComponents();
		argsCache = pendingRendering[id];
		delete pendingRendering[id];

		var result = null;
		if (isArr(argsCache)) {
			result = renderTreeIntoContainer(argsCache.vnode, container, argsCache.parentContext, argsCache.callback);
		} else if (vnode.vtype === VELEMENT) {
			result = rootNode;
		} else if (vnode.vtype === VCOMPONENT) {
			result = rootNode.cache[vnode.uid];
		}

		if (!isPending) {
			updateQueue.isPending = false;
			updateQueue.batchUpdate();
		}

		if (callback) {
			callback.call(result);
		}

		return result;
	}

	function render(vnode, container, callback) {
		return renderTreeIntoContainer(vnode, container, callback);
	}

	function unstable_renderSubtreeIntoContainer(parentComponent, subVnode, container, callback) {
		var context = parentComponent.$cache.parentContext;
		return renderTreeIntoContainer(subVnode, container, callback, context);
	}

	function unmountComponentAtNode(container) {
		if (!container.nodeName) {
			throw new Error('expect node');
		}
		var id = container[COMPONENT_ID];
		var vnode = null;
		if (vnode = vnodeStore[id]) {
			destroyVnode(vnode, container.firstChild);
			container.removeChild(container.firstChild);
			delete vnodeStore[id];
			return true;
		}
		return false;
	}

	function findDOMNode(node) {
		if (node == null) {
			return null;
		}
		if (node.nodeName) {
			return node;
		}
		var component = node;
		// if component.node equal to false, component must be unmounted
		if (component.getDOMNode && component.$cache.isMounted) {
			return component.getDOMNode();
		}
		throw new Error('findDOMNode can not find Node');
	}

	var ReactDOM = Object.freeze({
		render: render,
		unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
		unmountComponentAtNode: unmountComponentAtNode,
		findDOMNode: findDOMNode
	});

	function createElement(type, props, children) {
		var vtype = null;
		if (typeof type === 'string') {
			vtype = VELEMENT;
		} else if (typeof type === 'function') {
			if (type.prototype && typeof type.prototype.forceUpdate === 'function') {
				vtype = VCOMPONENT;
			} else {
				vtype = VSTATELESS;
			}
		} else {
			throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
		}

		var key = null;
		var ref = null;
		var finalProps = {};
		if (props != null) {
			for (var propKey in props) {
				if (!props.hasOwnProperty(propKey)) {
					continue;
				}
				if (propKey === 'key') {
					if (props.key !== undefined) {
						key = '' + props.key;
					}
				} else if (propKey === 'ref') {
					if (props.ref !== undefined) {
						ref = props.ref;
					}
				} else {
					finalProps[propKey] = props[propKey];
				}
			}
		}

		var defaultProps = type.defaultProps;

		if (defaultProps) {
			for (var propKey in defaultProps) {
				if (finalProps[propKey] === undefined) {
					finalProps[propKey] = defaultProps[propKey];
				}
			}
		}

		var argsLen = arguments.length;
		var finalChildren = children;

		if (argsLen > 3) {
			finalChildren = Array(argsLen - 2);
			for (var i = 2; i < argsLen; i++) {
				finalChildren[i - 2] = arguments[i];
			}
		}

		if (finalChildren !== undefined) {
			finalProps.children = finalChildren;
		}

		return createVnode(vtype, type, finalProps, key, ref);
	}

	function isValidElement(obj) {
		return obj != null && !!obj.vtype;
	}

	function cloneElement(originElem, props) {
		var type = originElem.type;
		var key = originElem.key;
		var ref = originElem.ref;

		var newProps = extend(extend({ key: key, ref: ref }, originElem.props), props);

		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		var vnode = createElement.apply(undefined, [type, newProps].concat(children));
		if (vnode.ref === originElem.ref) {
			vnode.refs = originElem.refs;
		}
		return vnode;
	}

	function createFactory(type) {
		var factory = function factory() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			return createElement.apply(undefined, [type].concat(args));
		};
		factory.type = type;
		return factory;
	}

	var tagNames = 'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan';
	var DOM = {};
	tagNames.split('|').forEach(function (tagName) {
		DOM[tagName] = createFactory(tagName);
	});

	var check = function check() {
	    return check;
	};
	check.isRequired = check;
	var PropTypes = {
	    "array": check,
	    "bool": check,
	    "func": check,
	    "number": check,
	    "object": check,
	    "string": check,
	    "any": check,
	    "arrayOf": check,
	    "element": check,
	    "instanceOf": check,
	    "node": check,
	    "objectOf": check,
	    "oneOf": check,
	    "oneOfType": check,
	    "shape": check
	};

	function only(children) {
		if (isValidElement(children)) {
			return children;
		}
		throw new Error('expect only one child');
	}

	function forEach(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var index = 0;
		if (isArr(children)) {
			flatEach(children, function (child) {
				iteratee.call(context, child, index++);
			});
		} else {
			iteratee.call(context, children, index);
		}
	}

	function map(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var store = [];
		var keyMap = {};
		forEach(children, function (child, index) {
			var data = {};
			data.child = iteratee.call(context, child, index) || child;
			data.isEqual = data.child === child;
			var key = data.key = getKey(child, index);
			if (keyMap.hasOwnProperty(key)) {
				keyMap[key] += 1;
			} else {
				keyMap[key] = 0;
			}
			data.index = keyMap[key];
			store.push(data);
		});
		var result = [];
		store.forEach(function (_ref) {
			var child = _ref.child;
			var key = _ref.key;
			var index = _ref.index;
			var isEqual = _ref.isEqual;

			if (child == null || typeof child === 'boolean') {
				return;
			}
			if (!isValidElement(child) || key == null) {
				result.push(child);
				return;
			}
			if (keyMap[key] !== 0) {
				key += ':' + index;
			}
			if (!isEqual) {
				key = escapeUserProvidedKey(child.key || '') + '/' + key;
			}
			child = cloneElement(child, { key: key });
			result.push(child);
		});
		return result;
	}

	function count(children) {
		var count = 0;
		forEach(children, function () {
			count++;
		});
		return count;
	}

	function toArray(children) {
		return map(children, identity) || [];
	}

	function getKey(child, index) {
		var key = undefined;
		if (isValidElement(child) && typeof child.key === 'string') {
			key = '.$' + child.key;
		} else {
			key = '.' + index.toString(36);
		}
		return key;
	}

	var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
	function escapeUserProvidedKey(text) {
		return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
	}

	var Children = Object.freeze({
		only: only,
		forEach: forEach,
		map: map,
		count: count,
		toArray: toArray
	});

	function eachMixin(mixins, iteratee) {
		mixins.forEach(function (mixin) {
			if (mixin) {
				if (isArr(mixin.mixins)) {
					eachMixin(mixin.mixins, iteratee);
				}
				iteratee(mixin);
			}
		});
	}

	function combineMixinToProto(proto, mixin) {
		for (var key in mixin) {
			if (!mixin.hasOwnProperty(key)) {
				continue;
			}
			var value = mixin[key];
			if (key === 'getInitialState') {
				proto.$getInitialStates.push(value);
				continue;
			}
			var curValue = proto[key];
			if (isFn(curValue) && isFn(value)) {
				proto[key] = pipe(curValue, value);
			} else {
				proto[key] = value;
			}
		}
	}

	function combineMixinToClass(Component, mixin) {
		if (mixin.propTypes) {
			Component.propTypes = Component.propTypes || {};
			extend(Component.propTypes, mixin.propTypes);
		}
		if (mixin.contextTypes) {
			Component.contextTypes = Component.contextTypes || {};
			extend(Component.contextTypes, mixin.contextTypes);
		}
		extend(Component, mixin.statics);
		if (isFn(mixin.getDefaultProps)) {
			Component.defaultProps = Component.defaultProps || {};
			extend(Component.defaultProps, mixin.getDefaultProps());
		}
	}

	function bindContext(obj, source) {
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				if (isFn(source[key])) {
					obj[key] = source[key].bind(obj);
				}
			}
		}
	}

	var Facade = function Facade() {};
	Facade.prototype = Component.prototype;

	function getInitialState() {
		var _this = this;

		var state = {};
		var setState = this.setState;
		this.setState = Facade;
		this.$getInitialStates.forEach(function (getInitialState) {
			if (isFn(getInitialState)) {
				extend(state, getInitialState.call(_this));
			}
		});
		this.setState = setState;
		return state;
	}
	function createClass(spec) {
		if (!isFn(spec.render)) {
			throw new Error('createClass: spec.render is not function');
		}
		var specMixins = spec.mixins || [];
		var mixins = specMixins.concat(spec);
		spec.mixins = null;
		function Klass(props, context) {
			Component.call(this, props, context);
			this.constructor = Klass;
			spec.autobind !== false && bindContext(this, Klass.prototype);
			this.state = this.getInitialState() || this.state;
		}
		Klass.displayName = spec.displayName;
		var proto = Klass.prototype = new Facade();
		proto.$getInitialStates = [];
		eachMixin(mixins, function (mixin) {
			combineMixinToProto(proto, mixin);
			combineMixinToClass(Klass, mixin);
		});
		proto.getInitialState = getInitialState;
		spec.mixins = specMixins;
		return Klass;
	}

	var React = extend({
	    version: '0.15.1',
	    cloneElement: cloneElement,
	    isValidElement: isValidElement,
	    createElement: createElement,
	    createFactory: createFactory,
	    Component: Component,
	    createClass: createClass,
	    Children: Children,
	    PropTypes: PropTypes,
	    DOM: DOM
	}, ReactDOM);

	React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;

	module.exports = React;

/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * routes
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = [{
		path: '/',
		controller: './home/controller'
	}, {
		path: '/home',
		controller: './home/controller'
	}, {
		path: '/list',
		controller: './list/controller'
	}, {
		path: '/detail',
		controller: './detail/controller'
	}, {
		path: '*',
		controller: './home/controller'
	}];
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * configuration
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = {
		container: '#container',
		type: 'createHistory',
		// type: 'createHashHistory',
		basename: '/examples/simple-spa'
	};
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(37);
	module.exports = self.fetch.bind(self);


/***/ },
/* 37 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.locationsAreEqual = exports.Actions = exports.useQueries = exports.useBeforeUnload = exports.useBasename = exports.createMemoryHistory = exports.createHashHistory = exports.createHistory = undefined;

	var _LocationUtils = __webpack_require__(15);

	Object.defineProperty(exports, 'locationsAreEqual', {
	  enumerable: true,
	  get: function get() {
	    return _LocationUtils.locationsAreEqual;
	  }
	});

	var _createBrowserHistory = __webpack_require__(10);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	var _createHashHistory2 = __webpack_require__(25);

	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

	var _createMemoryHistory2 = __webpack_require__(39);

	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

	var _useBasename2 = __webpack_require__(32);

	var _useBasename3 = _interopRequireDefault(_useBasename2);

	var _useBeforeUnload2 = __webpack_require__(31);

	var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);

	var _useQueries2 = __webpack_require__(27);

	var _useQueries3 = _interopRequireDefault(_useQueries2);

	var _Actions2 = __webpack_require__(18);

	var _Actions3 = _interopRequireDefault(_Actions2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createHistory = _createBrowserHistory2.default;
	exports.createHashHistory = _createHashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;
	exports.useBasename = _useBasename3.default;
	exports.useBeforeUnload = _useBeforeUnload3.default;
	exports.useQueries = _useQueries3.default;
	exports.Actions = _Actions3.default;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _warning = __webpack_require__(17);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(12);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _LocationUtils = __webpack_require__(15);

	var _PathUtils = __webpack_require__(16);

	var _createHistory = __webpack_require__(22);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	var _Actions = __webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createStateStorage = function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	};

	var createMemoryHistory = function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var getCurrentLocation = function getCurrentLocation() {
	    var entry = entries[current];
	    var path = (0, _PathUtils.createPath)(entry);

	    var key = void 0,
	        state = void 0;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    }

	    var init = (0, _PathUtils.parsePath)(path);

	    return (0, _LocationUtils.createLocation)(_extends({}, init, { state: state }), undefined, key);
	  };

	  var canGo = function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  };

	  var go = function go(n) {
	    if (!n) return;

	    if (!canGo(n)) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Cannot go(%s) there is not enough history', n) : void 0;

	      return;
	    }

	    current += n;
	    var currentLocation = getCurrentLocation();

	    // Change action to POP
	    history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	  };

	  var pushLocation = function pushLocation(location) {
	    current += 1;

	    if (current < entries.length) entries.splice(current);

	    entries.push(location);

	    saveState(location.key, location.state);
	  };

	  var replaceLocation = function replaceLocation(location) {
	    entries[current] = location;
	    saveState(location.key, location.state);
	  };

	  var history = (0, _createHistory2.default)(_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;


	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    return (0, _LocationUtils.createLocation)(entry);
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : (0, _invariant2.default)(false) : void 0;
	  }

	  var storage = createStateStorage(entries);

	  var saveState = function saveState(key, state) {
	    return storage[key] = state;
	  };

	  var readState = function readState(key) {
	    return storage[key];
	  };

	  return history;
	};

	exports.default = createMemoryHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./config": 35,
		"./config.js": 35,
		"./detail/controller": 41,
		"./detail/controller.js": 41,
		"./home/controller": 43,
		"./home/controller.js": 43,
		"./list/controller": 45,
		"./list/controller.js": 45,
		"./routes": 34,
		"./routes.js": 34
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 40;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/* nsure */(1, function(require) {
			cb(__webpack_require__(42));
		});
	}

/***/ },
/* 42 */,
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/* nsure */(2, function(require) {
			cb(__webpack_require__(44));
		});
	}

/***/ },
/* 44 */,
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/* nsure */(3, function(require) {
			cb(__webpack_require__(46));
		});
	}

/***/ }
/******/ ]);