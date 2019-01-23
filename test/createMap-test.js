import expect from 'expect'
import { createMap } from '../src/share/util'

describe('createMap', () => {
  it('return an object', () => {
    let map = createMap()

    expect(map).toBeA('object')
    expect(map.get).toBeA('function')
    expect(map.set).toBeA('function')
    expect(map.remove).toBeA('function')
    expect(map.has).toBeA('function')
  })

  it('basic usage correctly', () => {
    let map = createMap()

    let my_key = {}
    let my_value = {}
    let some_text = {}
    let my_another_key = {}
    let my_another_value = {}

    map.set(my_key, my_value)
    expect(map.get(my_key)).toEqual(my_value)

    map.set(my_key, my_another_value)
    expect(map.get(my_key)).toEqual(my_another_value)

    map.set(my_another_key, some_text)
    expect(map.get(my_another_key)).toEqual(some_text)
    expect(map.get(my_key)).toEqual(my_another_value)

    expect(map.has(my_key)).toBe(true)
    expect(map.has(my_another_key)).toBe(true)

    map.remove(my_key)
    expect(map.has(my_key)).toBe(false)
    expect(map.get(my_key)).toBe(undefined)
  })
})
