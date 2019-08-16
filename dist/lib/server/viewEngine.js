"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render = function (html) {
    if (typeof html === 'string') {
        return html;
    }
    else {
        return html.toString();
    }
};
var viewEngine = {
    render: render
};
exports.default = viewEngine;
//# sourceMappingURL=viewEngine.js.map