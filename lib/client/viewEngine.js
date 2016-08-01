/**
 * default view engine for client
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var render = function render(html, container) {
  container.innerHTML = html;
  return container;
};
exports.render = render;