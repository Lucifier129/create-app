// util
import CA from './types'
export const isThenable: CA.IsThenable = (obj) => {
  return obj !== undefined && obj !== null && typeof obj.then === 'function'
}

export const identity: CA.Identity = (obj) => {
  return obj
}

export const extend: CA.Extend = (to, from) => {
  if (!from) {
    return to
  }
  let keys: string[] = Object.keys(from)
  let i: number = keys.length
  while (i--) {
    to[keys[i]] = from[keys[i]]
  }
  return to
}

export class ReqError extends Error {
  status?: number
  constructor(message?: string, status?: number) {
    super(message)
    this.status = status
  }
}

export const createCache: CA.CreateCache = <T>(amount = 10) => {
  let cache: CA.CacheStorage<T> = {}

  const keys = () => {
    return Object.keys(cache)
  }

  const checkAmount = () => {
    let cacheKeys: string[] = keys()
    if (cacheKeys.length > amount) {
      remove(cacheKeys[0])
    }
  }

  const set: (key: string, value: T) => void = (key, value) => {
    remove(key)
    cache[key] = value
    checkAmount()
  }

  const get: (key: string) => T = (key) => {
    return <T>cache[key]
  }

  const remove: (key: string) => void = (key) => {
    if (cache.hasOwnProperty(key)) {
      delete cache[key]
    }
  }

  const getAll: () => CA.CacheStorage<T> = () => {
    return cache
  }

  return { keys, get, set, remove, getAll } as CA.Cache<T>
}

export const createMap: CA.CreateMap = <K, V>() => {
  let list: CA.MapItem<K, V>[] = []

  const find: (key: K) => CA.MapItem<K, V>[] = (key) => {
    return list.filter(item => item.key === key)
  }

  const has: (key: K) => boolean = (key) => {
    let result = find(key)
    return result.length > 0
  }

  const get: (key: K) => V = (key) => {
    let result = find(key)
    return result.length ? result[0].value : undefined
  }

  const set: (key: K, value: V) => void = (key, value) => {
    let result = find(key)

    if (result.length === 0) {
      let item = { key, value }
      list.push(item)
    } else {
      result[0].value = value
    }
  }

  const remove: (key: K) => void = (key) => {
    list = list.filter(item => item.key !== key)
  }

  return { get, set, has, remove } as CA.AppMap<K, V>
}

if (!Object.freeze) {
  Object.freeze = <{ <T>(a: T[]): ReadonlyArray<T>; <T extends Function>(f: T): T; <T>(o: T): Readonly<T>; }>identity
}
