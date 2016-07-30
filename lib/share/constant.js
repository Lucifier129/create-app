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