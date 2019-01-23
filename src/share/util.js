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

export function createCache(amount = 10) {
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

export function createMap() {
  let list = []

  function find(key) {
    return list.filter(item => item.key === key)
  }

  function has(key) {
    let result = find(key)
    return result.length > 0
  }

  function get(key) {
    let result = find(key)
    return result.length ? result[0].value : undefined
  }

  function set(key, value) {
    let result = find(key)

    if (result.length === 0) {
      result = { key, value }
      list.push(result)
    } else {
      result.value = value
    }
  }

  function remove(key) {
    list = list.filter(item => item.key !== key)
  }

  return { get, set, has, remove }
}

if (!Object.freeze) {
  Object.freeze = identity
}
