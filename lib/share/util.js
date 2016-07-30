// util

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isFn = isFn;
exports.isThenable = isThenable;
exports.invoke = invoke;
exports.noop = noop;
exports.identity = identity;
exports.extend = extend;
exports.getUid = getUid;
var emptyList = [];

exports.emptyList = emptyList;

function isFn(obj) {
    return typeof obj === 'function';
}

function isThenable(obj) {
    return obj != null && isFn(obj.then);
}

function invoke(fn) {
    return fn();
}

var isArr = Array.isArray;

exports.isArr = isArr;

function noop() {}

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

var uid = 0;

function getUid() {
    return ++uid;
}

if (!Object.freeze) {
    Object.freeze = identity;
}