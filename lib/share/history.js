/**
 * custom history import
 */

// HTML5 history
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _historyLibCreateBrowserHistory = require('history/lib/createBrowserHistory');

var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

// Hash history

var _historyLibCreateHashHistory = require('history/lib/createHashHistory');

var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

// query support

var _historyLibUseQueries = require('history/lib/useQueries');

var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);

// beforeunload support

var _historyLibUseBeforeUnload = require('history/lib/useBeforeUnload');

var _historyLibUseBeforeUnload2 = _interopRequireDefault(_historyLibUseBeforeUnload);

// basename support

var _historyLibUseBasename = require('history/lib/useBasename');

var _historyLibUseBasename2 = _interopRequireDefault(_historyLibUseBasename);

exports['default'] = {
	createHistory: _historyLibCreateBrowserHistory2['default'],
	createHashHistory: _historyLibCreateHashHistory2['default'],
	useQueries: _historyLibUseQueries2['default'],
	useBeforeUnload: _historyLibUseBeforeUnload2['default'],
	useBasename: _historyLibUseBasename2['default']
};
module.exports = exports['default'];