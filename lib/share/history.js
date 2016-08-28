'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createBrowserHistory = require('create-history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createHashHistory = require('create-history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _useQueries = require('create-history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _useBeforeUnload = require('create-history/lib/useBeforeUnload');

var _useBeforeUnload2 = _interopRequireDefault(_useBeforeUnload);

var _useBasename = require('create-history/lib/useBasename');

var _useBasename2 = _interopRequireDefault(_useBasename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// beforeunload support


// Hash history
exports.default = {
	createHistory: _createBrowserHistory2.default,
	createHashHistory: _createHashHistory2.default,
	useQueries: _useQueries2.default,
	useBeforeUnload: _useBeforeUnload2.default,
	useBasename: _useBasename2.default
};

// basename support


// query support
/**
 * custom history import
 */

// HTML5 history