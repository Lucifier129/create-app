import expect from 'expect'
import createMatcher from '../src/share/createMatcher'


describe('createMatcher', () => {
	it('should return function', () => {
		let matcher = createMatcher([])
		
		expect(typeof matcher).toEqual('function')
	})
})

describe('browser', () => {
	it('should run in real browser', () => {
		expect(typeof window).toEqual('object')
		expect(typeof window.document).toEqual('object')
		expect(history).toEqual(window.history)
	})
})