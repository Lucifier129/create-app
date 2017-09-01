'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
  key/value configs
*/
var isClient = exports.isClient = typeof window !== 'undefined';
var isServer = exports.isServer = !isClient;
var defaultAppSettings = exports.defaultAppSettings = {
	container: '#container',
	basename: '',
	context: {
		isServer: isServer,
		isClient: isClient
	},
	type: 'createHashHistory',
	loader: function loader(value) {
		return value;
	}
};