// util
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isThenable = isThenable;
exports.identity = identity;
exports.extend = extend;

function isThenable(obj) {
    return obj != null && typeof obj.then === 'function';
}

function identity(obj) {
    return obj;
}

function extend(to, from) {
    if (!from) {
        return to;
    }
    var keys = Object.keys(from);
    var i = keys.length;
    while (i--) {
        to[keys[i]] = from[keys[i]];
    }
    return to;
}

if (!Object.freeze) {
    Object.freeze = identity;
}