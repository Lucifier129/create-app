// util

export let emptyList = []

export function isFn(obj) {
    return typeof obj === 'function'
}

export function isThenable(obj) {
    return obj != null && isFn(obj.then)
}

export function invoke(fn) {
    return fn()
}

export let isArr = Array.isArray

export function noop() {}
export function identity(obj) {
    return obj
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
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


let uid = 0
export function getUid() {
    return ++uid
}

if (!Object.freeze) {
    Object.freeze = identity
}