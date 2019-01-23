'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isThenable = isThenable;
exports.identity = identity;
exports.extend = extend;
exports.createCache = createCache;
exports.createMap = createMap;
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
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

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

function createMap() {
  var list = [];

  function find(key) {
    return list.filter(function (item) {
      return item.key === key;
    });
  }

  function has(key) {
    var result = find(key);
    return result.length > 0;
  }

  function get(key) {
    var result = find(key);
    return result.length ? result[0].value : undefined;
  }

  function set(key, value) {
    var result = find(key);

    if (result.length === 0) {
      result = { key: key, value: value };
      list.push(result);
    } else {
      result.value = value;
    }
  }

  function remove(key) {
    list = list.filter(function (item) {
      return item.key !== key;
    });
  }

  return { get: get, set: set, has: has, remove: remove };
}

if (!Object.freeze) {
  Object.freeze = identity;
}