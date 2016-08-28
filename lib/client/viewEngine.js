"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * default view engine for client
 */
var render = exports.render = function render(html, container) {
  container.innerHTML = html;
  return container;
};