// util
import {
  CreateCache,
  CacheStorage,
  Cache,
  CreateMap,
  MapItem,
  AppMap
} from './type'

export class ReqError extends Error {
  status?: number
  constructor(message?: string, status?: number) {
    super(message)
    this.status = status
  }
}

export const createCache: CreateCache = <T>(amount = 10) => {
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
    return <T>cache[key]
  }

  const remove: (key: string) => void = (key) => {
    if (cache.hasOwnProperty(key)) {
      delete cache[key]
    }
  }

  const getAll: () => CacheStorage<T> = () => {
    return cache
  }

  return { keys, get, set, remove, getAll } as Cache<T>
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

  return { get, set, has, remove } as AppMap<K, V>
}