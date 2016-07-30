'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _serverIndex = require('./server/index');

var _serverIndex2 = _interopRequireDefault(_serverIndex);

var _clientIndex = require('./client/index');

var _clientIndex2 = _interopRequireDefault(_clientIndex);

exports['default'] = {
	server: _serverIndex2['default'],
	client: _clientIndex2['default']
};
module.exports = exports['default'];