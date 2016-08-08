/**
 * custom history import
 */

// HTML5 history
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createHistoryLibCreateBrowserHistory = require('create-history/lib/createBrowserHistory');

var _createHistoryLibCreateBrowserHistory2 = _interopRequireDefault(_createHistoryLibCreateBrowserHistory);

// Hash history

var _createHistoryLibCreateHashHistory = require('create-history/lib/createHashHistory');

var _createHistoryLibCreateHashHistory2 = _interopRequireDefault(_createHistoryLibCreateHashHistory);

// query support

var _createHistoryLibUseQueries = require('create-history/lib/useQueries');

var _createHistoryLibUseQueries2 = _interopRequireDefault(_createHistoryLibUseQueries);

// beforeunload support

var _createHistoryLibUseBeforeUnload = require('create-history/lib/useBeforeUnload');

var _createHistoryLibUseBeforeUnload2 = _interopRequireDefault(_createHistoryLibUseBeforeUnload);

// basename support

var _createHistoryLibUseBasename = require('create-history/lib/useBasename');

var _createHistoryLibUseBasename2 = _interopRequireDefault(_createHistoryLibUseBasename);

exports['default'] = {
	createHistory: _createHistoryLibCreateBrowserHistory2['default'],
	createHashHistory: _createHistoryLibCreateHashHistory2['default'],
	useQueries: _createHistoryLibUseQueries2['default'],
	useBeforeUnload: _createHistoryLibUseBeforeUnload2['default'],
	useBasename: _createHistoryLibUseBasename2['default']
};
module.exports = exports['default'];