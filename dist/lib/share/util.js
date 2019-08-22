"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.isThenable = function (obj) {
    return obj !== undefined && obj !== null && typeof obj.then === 'function';
};
exports.identity = function (obj) {
    return obj;
};
exports.extend = function (to, from) {
    if (!from) {
        return to;
    }
    var keys = Object.keys(from);
    var i = keys.length;
    while (i--) {
        to[keys[i]] = from[keys[i]];
    }
    return to;
};
var ReqError = /** @class */ (function (_super) {
    __extends(ReqError, _super);
    function ReqError(message, status) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        return _this;
    }
    return ReqError;
}(Error));
exports.ReqError = ReqError;
exports.createCache = function (amount) {
    if (amount === void 0) { amount = 10; }
    var cache = {};
    var keys = function () {
        return Object.keys(cache);
    };
    var checkAmount = function () {
        var cacheKeys = keys();
        if (cacheKeys.length > amount) {
            remove(cacheKeys[0]);
        }
    };
    var set = function (key, value) {
        remove(key);
        cache[key] = value;
        checkAmount();
    };
    var get = function (key) {
        return cache[key];
    };
    var remove = function (key) {
        if (cache.hasOwnProperty(key)) {
            delete cache[key];
        }
    };
    var getAll = function () {
        return cache;
    };
    return { keys: keys, get: get, set: set, remove: remove, getAll: getAll };
};
exports.createMap = function () {
    var list = [];
    var find = function (key) {
        return list.filter(function (item) { return item.key === key; });
    };
    var has = function (key) {
        var result = find(key);
        return result.length > 0;
    };
    var get = function (key) {
        var result = find(key);
        return result.length ? result[0].value : undefined;
    };
    var set = function (key, value) {
        var result = find(key);
        if (result.length === 0) {
            var item = { key: key, value: value };
            list.push(item);
        }
        else {
            result[0].value = value;
        }
    };
    var remove = function (key) {
        list = list.filter(function (item) { return item.key !== key; });
    };
    return { get: get, set: set, has: has, remove: remove };
};
if (!Object.freeze) {
    Object.freeze = exports.identity;
}
//# sourceMappingURL=util.js.map