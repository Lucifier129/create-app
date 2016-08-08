import expect from 'expect'
import execSteps from './execSteps'
import createApp from '../src/server'
import { getController, Home, List, Detail, NotFound } from './classes'

let app

describe('createApp-server', () => {
    describe('result', () => {
        it('should return an object', () => {
            let app = createApp({
                routes: [],
            })
            expect(app).toBeA('object')
            expect(app.render).toBeA('function')
            expect(app.history).toBeA('object')
        })
    })

    let initApp = settings => {
    	app = createApp({
    		...settings,
    	})
    }

    describe('feature: works without loader', () => {
        beforeEach(() => {
            let routes = [{
                path: '/(home|debug.html)?',
                controller: () => Home,
            }, {
                path: '/list',
                controller: () => List,
            }, {
                path: '/detail',
                controller: () => Detail,
            }, {
                path: '*',
                controller: () => NotFound,
            }]

            return initApp({
                routes,
            })
        })
        createTest()
    })

    describe('feature: works with loader', () => {
        let routes = [{
            path: '/(home|debug.html)?',
            controller: 'home',
        }, {
            path: '/list',
            controller: 'list',
        }, {
            path: '/detail',
            controller: 'detail',
        }, {
            path: '*',
            controller: '*',
        }]

        describe('callback style at sync mode', () => {
            beforeEach(() => {
                let loader = (controller, init) => {
                    let Controller
                    switch (controller) {
                        case 'home':
                            Controller = Home
                            break
                        case 'list':
                            Controller = List
                            break
                        case 'detail':
                            Controller = Detail
                            break
                        default:
                            Controller = NotFound
                    }
                    return init(Controller)
                }
                return initApp({
                    routes,
                    loader,
                })
            })
            createTest()
        })

        describe('callback style at async mode', () => {
            beforeEach(() => {
                let loader = (controller) => {
                    let Controller
                    switch (controller) {
                        case 'home':
                            Controller = Home
                            break
                        case 'list':
                            Controller = List
                            break
                        case 'detail':
                            Controller = Detail
                            break
                        default:
                            Controller = NotFound
                    }

                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(Controller)
                        }, 10)
                    })
                }
                return initApp({
                    routes,
                    loader,
                })
            })
            createTest()
        })
    })
})

function createTest() {
    it('should return string with a url by callback style', done => {
    	let count = 0
    	let cleanup = () => {
    		count += 1
    		if (count === 5) {
    			done()
    		}
    	}
        app.render('/', (error, content) => {
        	expect(content).toEqual('home')
        	cleanup()
        })
        app.render('/list', (error, content) => {
        	expect(content).toEqual('list')
        	cleanup()
        })
        app.render('/detail', (error, content) => {
        	expect(content).toEqual('detail')
        	cleanup()
        })
        app.render('/notfound', (error, content) => {
        	expect(content).toEqual('not found')
        	cleanup()
        })
        app.render(`/random-${Math.random().toString(36).substr(2)}`, (error, content) => {
        	expect(content).toEqual('not found')
        	cleanup()
        })
    })
    it('should return string with a url by promise style', done => {
    	let home = Promise.resolve(app.render('/'))
    	.then(content => {
        	expect(content).toEqual('home')
        })
        let list = Promise.resolve(app.render('/list'))
        .then(content => {
        	expect(content).toEqual('list')
        })
        let detail = Promise.resolve(app.render('/detail'))
        .then(content => {
        	expect(content).toEqual('detail')
        })
        let notfound = Promise.resolve(app.render('/notfound'))
        .then(content => {
        	expect(content).toEqual('not found')
        })
        let random = Promise.resolve(app.render(`/random-${Math.random().toString(36).substr(2)}`))
        .then(content => {
        	expect(content).toEqual('not found')
        })
        Promise.all([home, list, detail, notfound, random])
        .then(() => done)
        .catch(console.error.bind(console))
    })
}
