// util
export function isThenable(obj) {
    return obj != null && typeof obj.then === 'function'
}

export function identity(obj) {
    return obj
}

export function extend(to, from) {
    if (!from) {
        return to
    }
    var keys = Object.keys(from)
    var i = keys.length
    while (i--) {
        to[keys[i]] = from[keys[i]]
    }
    return to
}

export function createCache(amount=10) {
    let cache = {}

    function keys() {
        return Object.keys(cache)
    }

    function checkAmount() {
        let cacheKeys = keys(cache)
        if (cacheKeys.length > amount) {
            remove(cacheKeys[0])
        }
    }

    function set(key, value) {
        remove(key)
        cache[key] = value
        checkAmount()
    }

    function get(key) {
        return cache[key]
    }

    function remove(key) {
        if (cache.hasOwnProperty(key)) {
            delete cache[key]
        }
    }

    function getAll() {
        return cache
    }

    return { keys, get, set, remove, getAll }
}

if (!Object.freeze) {
    Object.freeze = identity
}