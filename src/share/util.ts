// util
export const isThenable: (obj: any) => boolean = (obj) => {
  return obj !== undefined && obj !== null && typeof obj.then === 'function'
}

export const identity: (obj: object) => object = (obj) => {
  return obj
}

export const extend: (to: object, from: object) => object = (to, from) => {
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

export interface Cache {
  keys: () => string[]
  get: (key: string) => any
  set: (key: string, value: any) => void
  remove: (key: string) => void
  getAll: () => CacheStorage
}

export interface CacheStorage {
  [key: string]: any
}

export const createCache: (amount: number) => Cache = (amount = 10) => {
  let cache: CacheStorage = {}

  const keys = () => {
    return Object.keys(cache)
  }

  const checkAmount = () => {
    let cacheKeys: string[] = keys()
    if (cacheKeys.length > amount) {
      remove(cacheKeys[0])
    }
  }

  const set: (key: string, value: any) => void = (key, value) => {
    remove(key)
    cache[key] = value
    checkAmount()
  }

  const get: (key: string) => any = (key) => {
    return cache[key]
  }

  const remove: (key: string) => void = (key) => {
    if (cache.hasOwnProperty(key)) {
      delete cache[key]
    }
  }

  const getAll = () => {
    return cache
  }

  return { keys, get, set, remove, getAll }
}

export interface AppMap {
  get: (key: string) => any
  set: (key: string, value: any) => void
  has: (key: string) => boolean
  remove: (key: string) => void
}

export const createMap: () => AppMap = () => {
  let list: any[] = []

  const find: (key) => any[] = (key) => {
    return list.filter(item => item.key === key)
  }

  const has: (key: string) => boolean = (key) => {
    let result = find(key)
    return result.length > 0
  }

  const get: (key: string) => any = (key) => {
    let result = find(key)
    return result.length ? result[0].value : undefined
  }

  const set: (key: string, value: any) => void = (key, value) => {
    let result = find(key)

    if (result.length === 0) {
      let item = { key, value }
      list.push(item)
    } else {
      result[0].value = value
    }
  }

  const remove: (key: string) => void = (key) => {
    list = list.filter(item => item.key !== key)
  }

  return { get, set, has, remove }
}

if (!Object.freeze) {
  Object.freeze = <{ <T>(a: T[]): readonly T[]; <T extends Function>(f: T): T; <T>(o: T): Readonly<T>; }>identity
}
