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

export interface Cache<T> {
  keys: () => string[]
  get: (key: string) => T
  set: (key: string, value: any) => void
  remove: (key: string) => void
  getAll: () => CacheStorage<T>
}

export interface CacheStorage<T> {
  [key: string]: T
}

export const createCache: <T>(amount: number) => Cache<T> = <T>(amount = 10) => {
  let cache: CacheStorage<T> = {}

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
    return cache[key]
  }

  const remove: (key: string) => void = (key) => {
    if (cache.hasOwnProperty(key)) {
      delete cache[key]
    }
  }

  const getAll: () => CacheStorage<T> = () => {
    return cache
  }

  return { keys, get, set, remove, getAll }
}

export interface AppMap<K, V> {
  get: (key: K) => V
  set: (key: K, value: V) => void
  has: (key: K) => boolean
  remove: (key: K) => void
}

export interface CreateMap {
  <K, V>(): AppMap<K, V>
}

export interface MapItem<K, V> {
  key: K
  value: V
}

export const createMap: CreateMap = <K, V>() => {
  let list: MapItem<K, V>[] = []

  const find: (key: K) => MapItem<K, V>[] = (key) => {
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

  return { get, set, has, remove }
}

if (!Object.freeze) {
  Object.freeze = <{ <T>(a: T[]): readonly T[]; <T extends Function>(f: T): T; <T>(o: T): Readonly<T>; }>identity
}
