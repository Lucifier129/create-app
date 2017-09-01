import expect from 'expect'
import {createCache} from '../src/share/util'

describe('createCache', () => {

    it('should return an object', () => {
        let cache = createCache()

        expect(cache).toBeA('object')
        expect(cache.get).toBeA('function')
        expect(cache.set).toBeA('function')
        expect(cache.remove).toBeA('function')
        expect(cache.keys).toBeA('function')
    })

    it('should cache value by key and get the same value by key', () => {
        let cache = createCache()

        cache.set('my_key', 'my_value')
        expect(cache.get('my_key')).toEqual('my_value')

        cache.set('my_key', 'my_another_value')
        expect(cache.get('my_key')).toEqual('my_another_value')

        cache.set('my_another_key', 'some_text')
        expect(cache.get('my_another_key')).toEqual('some_text')
        expect(cache.get('my_key')).toEqual('my_another_value')
    })

    it('should get keys from cache', () => {
        let cache = createCache()

        cache.set('my_key', 'my_value')
        expect(cache.keys()).toEqual(['my_key'])

        cache.set('my_another_key', 'my_another_value')
        expect(cache.keys()).toEqual(['my_key', 'my_another_key'])
    })

    it('should remove key from cache', () => {
        let cache = createCache()

        cache.set('my_key', 'my_value')
        cache.set('my_another_key', 'my_another_value')
        expect(cache.keys()).toEqual(['my_key', 'my_another_key'])

        cache.remove('my_another_key')
        expect(cache.keys()).toEqual(['my_key'])

        cache.remove('my_key')
        expect(cache.keys()).toEqual([])
    })

    it('should move the key to the last when update value', () => {
        let cache = createCache()

        cache.set('my_key', 'my_value')
        cache.set('my_another_key', 'my_another_value')
        expect(cache.keys()).toEqual(['my_key', 'my_another_key'])

        cache.set('my_key', 'my_new_value')
        expect(cache.keys()).toEqual(['my_another_key', 'my_key'])

        cache.set('my_another_key', 'my_another_new_value')
        expect(cache.keys()).toEqual(['my_key', 'my_another_key'])
    })

    it('should balance the keys length in ten by default', () => {
        let cache = createCache()
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

        list.forEach(number => cache.set(number, number))
        expect(cache.keys().length).toEqual(10)
        expect(cache.keys()).toEqual(['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'])
    })

    it('should support set cache amount by customer', () => {
        let cache = createCache(11)
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

        list.forEach(number => cache.set(number, number))
        expect(cache.keys().length).toEqual(11)
        expect(cache.keys()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'])
        expect(cache.get('1', 1))
        expect(cache.get('4', 4))
        expect(cache.get('7', 7))
        expect(cache.get('11', 11))
    })

})