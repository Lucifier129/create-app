/*!
 * create-app.js v0.1.1
 * (c) 2016 Jade Gu
 * Released under the MIT License.
 */
'use strict';

var History = require('history');
History = 'default' in History ? History['default'] : History;
var pathToRegExp = require('path-to-regexp');
pathToRegExp = 'default' in pathToRegExp ? pathToRegExp['default'] : pathToRegExp;

var index = {
	History: History,
	pathToRegExp: pathToRegExp
};

module.exports = index;