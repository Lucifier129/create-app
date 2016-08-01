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

if (!Object.freeze) {
    Object.freeze = identity
}