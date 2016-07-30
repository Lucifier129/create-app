/**
 * default view engine for client
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _shareUtil = require('../share/util');

var render = function render(html, container) {
  container.innerHTML = html;
  return container;
};
exports.render = render;