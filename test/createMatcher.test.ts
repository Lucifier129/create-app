import createMatcher from '../src/share/createMatcher'


let matcher

describe('createMatcher', () => {

    describe('result', () => {
        it('should return a function', () => {
            let matcher = createMatcher([])
            expect(typeof matcher).toBe('function')
        })
    })

    describe('feature', () => {
        beforeEach(() => {
            matcher = createMatcher([{
                path: '/test/path',
                controller: 'test normal string',
            }, {
                path: '/param/:id',
                controller: 'test string with a id param',
            }, {
                path: '*',
                controller: 'default route',
            }])
        })

        it('should return an object when matched a route', () => {
            let result = matcher('/test/path')

            expect(typeof result).toBe('object')
            expect(result.path).toEqual('/test/path')
            expect(result.params).toEqual({})
            expect(result.controller).toEqual('test normal string')
            expect(Object.keys(result)).toEqual(['path', 'params', 'controller'])
        })

        it('should return undefined when matched no route', () => {
            let matcher = createMatcher([])
            let result = matcher('/test/path')

            expect(result).toBe(undefined)
        })

        it('should match dynamic path and filled params', () => {
            let result = matcher('/param/404')

            expect(result.path).toEqual('/param/:id')
            expect(result.controller).toEqual('test string with a id param')
            expect(result.params.id).toEqual('404')
        })

        it('should return a default route', () => {
            let result = matcher('/anything')

            expect(result.path).toBe('*')
            expect(result.params).toEqual({
                0: '/anything'
            })
            expect(result.controller).toBe('default route')
        })
    })
})
