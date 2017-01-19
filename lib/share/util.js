'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isThenable = isThenable;
exports.identity = identity;
exports.extend = extend;
exports.isAbsoluteUrl = isAbsoluteUrl;
// util
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

function isAbsoluteUrl(url) {
    if (typeof url !== 'string') {
        throw new Error('expected url to be a string');
    }
    if (url.charAt(0) === '/' && url.charAt(1) === '/') {
        return true;
    }
    var str1 = url.charAt(0) + url.charAt(1);
    var str2 = str1 + url.charAt(2) + url.charAt(3);
    return str1 === '//' || str2 === 'http';
}

if (!Object.freeze) {
    Object.freeze = identity;
}