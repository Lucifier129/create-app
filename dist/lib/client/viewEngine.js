"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render = function (html, container) {
    container.innerHTML = html;
    return container;
};
var viewEngine = {
    render: render
};
exports.default = viewEngine;
//# sourceMappingURL=viewEngine.js.map