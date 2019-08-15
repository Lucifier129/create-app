import execSteps from './squences/execSteps'
import { getController, Home, List, Detail, Restore, NotFound } from './squences/classes'
import createApp from '../server';

let app: createApp.App

describe('createApp-server', () => {
    describe('result', () => {
        it('should return an object', () => {
            let app = createApp({
                routes: [],
            })
            expect(typeof app).toBe('object')
            expect(typeof app.render).toBe('function')
            expect(typeof app.history).toBe('object')
        })
    })

    let initApp = settings => {
        app = createApp({
            ...settings,
        })
    }

    describe('feature: works without custom loader', () => {
        describe('sync mode', () => {
            beforeEach(() => {
                let routes = [{
                    path: '/(home|debug.html)?',
                    controller: Home,
                }, {
                    path: '/list',
                    controller: List,
                }, {
                    path: '/detail',
                    controller: Detail,
                }, {
                    path: '*',
                    controller: NotFound,
                }]

                return initApp({
                    routes,
                })
            })
            createTest()
        })
        describe('async mode', () => {
            beforeEach(() => {
                let routes = [{
                    path: '/(home|debug.html)?',
                    controller: Promise.resolve(Home),
                }, {
                    path: '/list',
                    controller: Promise.resolve(List),
                }, {
                    path: '/detail',
                    controller: Promise.resolve(Detail),
                }, {
                    path: '*',
                    controller: Promise.resolve(NotFound),
                }]

                return initApp({
                    routes,
                })
            })
            createTest()
        })
    })

    describe('feature: works with custom loader', () => {
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

        describe('sync mode', () => {
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
                    return Controller
                }
                return initApp({
                    routes,
                    loader,
                })
            })
            createTest()
        })

        describe('async mode', () => {
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
        app.render('/', {}, (error, {content}) => {
            expect(content).toEqual('home')
            cleanup()
        })
        app.render('/list', (error, {content}) => {
            expect(content).toEqual('list')
            cleanup()
        })
        app.render('/detail', (error, {content}) => {
            expect(content).toEqual('detail')
            cleanup()
        })
        app.render('/notfound', (error, {content}) => {
            expect(content).toEqual('not found')
            cleanup()
        })
        app.render(`/random-${Math.random().toString(36).substr(2)}`, (error, {content}) => {
            expect(content).toEqual('not found')
            cleanup()
        })
    })
    it('should return string with a url by promise style', done => {
        let home = Promise.resolve(app.render('/'))
            .then(({content}) => {
                expect(content).toEqual('home')
            })
        let list = Promise.resolve(app.render('/list'))
            .then(({content}) => {
                expect(content).toEqual('list')
            })
        let detail = Promise.resolve(app.render('/detail'))
            .then(({content}) => {
                expect(content).toEqual('detail')
            })
        let notfound = Promise.resolve(app.render('/notfound'))
            .then(({content}) => {
                expect(content).toEqual('not found')
            })
        let random = Promise.resolve(app.render(`/random-${Math.random().toString(36).substr(2)}`))
            .then(({content}) => {
                expect(content).toEqual('not found')
            })
        Promise.all([home, list, detail, notfound, random])
            .then(() => done())
            .catch(error => console.error(error.stack))
    })
    it('should support inject context to app.render method', done => {
        let home = Promise.resolve(app.render('/', { test: 1 }))
            .then(({content, controller}) => {
                expect(controller.context.test).toEqual(1)
                expect(content).toEqual('home')
            })
        let list = Promise.resolve(app.render('/list', { test: 2 }))
            .then(({content, controller}) => {
                expect(controller.context.test).toEqual(2)
                expect(content).toEqual('list')
            })
        Promise.all([home, list])
            .then(() => done())
            .catch(error => console.error(error.stack))
    })
}
