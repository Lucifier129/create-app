'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isThenable = isThenable;
exports.identity = identity;
exports.extend = extend;
exports.createCache = createCache;
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

function createCache() {
    var amount = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

    var cache = {};

    function keys() {
        return Object.keys(cache);
    }

    function checkAmount() {
        var cacheKeys = keys(cache);
        if (cacheKeys.length > amount) {
            remove(cacheKeys[0]);
        }
    }

    function set(key, value) {
        remove(key);
        cache[key] = value;
        checkAmount();
    }

    function get(key) {
        return cache[key];
    }

    function remove(key) {
        if (cache.hasOwnProperty(key)) {
            delete cache[key];
        }
    }

    function getAll() {
        return cache;
    }

    return { keys: keys, get: get, set: set, remove: remove, getAll: getAll };
}

if (!Object.freeze) {
    Object.freeze = identity;
}