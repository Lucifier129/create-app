import expect from 'expect'
import execSteps from '../execSteps'
import createApp from '../../src/client'

let controller

class Home {
    constructor() {
        controller = this
    }
    init() {
        return this.render()
    }
    render() {
        return 'home'
    }
}
class List {
    constructor() {
        controller = this
    }
    init() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.render())
            }, 50)
        })
    }
    render() {
        return 'list'
    }
}
class Detail {
    constructor() {
        controller = this
    }
    init() {
        return this.render()
    }
    render() {
        return 'detail'
    }
}
class NotFound {
    constructor() {
        controller = this
    }
    init() {
        return this.render()
    }
    render() {
        return 'not found'
    }
}

let app

describe('createApp', () => {

    describe('result', () => {
        it('should return an object', () => {
            let app = createApp({
                routes: [],
            })
            expect(app).toBeA('object')
            expect(app.start).toBeA('function')
            expect(app.stop).toBeA('function')
            expect(app.history).toBeA('object')
        })
    })

    describe('feature', () => {
        describe('hash history', () => {
            describeTest('createHashHistory')
        })
        describe('pushState history', () => {
            describeTest('createHistory')
        })
    })
})


function describeTest(type) {
    let initApp = (settings) => {
        // clear app and document.body
        if (app) {
            app.stop()
            document.body.innerHTML = ''
        }

        app = createApp({
            container: 'body',
            ...settings,
            type,
        })
        return new Promise(resolve => {
            app.start(null, false)
            app.subscribe(resolve)
            console.log(app.history.getCurrentLocation().pathname)
            
            app.history.push(`/random${Math.random().toString(36).substr(2)}`)
        })
    }

    describe('works without loader', () => {
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

    describe('works with loader', () => {
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
                    switch (controller) {
                        case 'home':
                            init(Home)
                            break
                        case 'list':
                            init(List)
                            break
                        case 'detail':
                            init(Detail)
                            break
                        default:
                            init(NotFound)
                    }
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
}

function createTest() {

    it('should get container by controller.getContainer', () => {
        let container = controller.getContainer()
        expect(container).toBe(document.querySelector('body'))
    })

    it('should match browser location and render page', (done) => {
        app.subscribe(location => {
            let content = document.body.innerHTML
            expect(content).toEqual('home')
            done()
        })
        app.history.push('/')
    })

    it('should refresh view when calling container.refreshView', () => {
        app.subscribe(location => {
            let content = document.body.innerHTML
            expect(content).toEqual('home')

            document.body.innerHTML = ''

            content = document.body.innerHTML
            expect(content).toEqual('')

            controller.refreshView()
            content = document.body.innerHTML
            expect(content).toEqual('home')
        })
        app.history.push('/')
    })

    it('should go to another location and render page', (done) => {
        let count = 0
        app.subscribe(location => {
            let content
            switch(count) {
                case 0:
                    content = document.body.innerHTML
                    expect(content).toEqual('home')
                    app.history.push('/detail')
                    break
                case 1:
                    content = document.body.innerHTML
                    expect(content).toEqual('detail')
                    done()
                    break
                }
            count += 1
        })
        app.history.push('/')
    })

    it('should wait for promise resolved when controller.init return promise', (done) => {
        let start
        let count = 0
        app.subscribe(location => {
            let content
            switch(count) {
                case 0:
                    content = document.body.innerHTML
                    expect(content).toEqual('home')
                    start = new Date()
                    app.history.push('/list')
                    break
                case 1:
                    content = document.body.innerHTML
                    expect(content).toEqual('list')
                    expect(new Date() - start > 50).toBe(true)
                    done()
                    break
            }
            count += 1
        })
        app.history.push('/')
    })

    it('should go to another location when calling controller#goX method', (done) => {
        let count = 0
        app.subscribe(location => {
            let content
            switch(count) {
                case 0:
                    content = document.body.innerHTML
                    expect(content).toEqual('home')
                    controller.goTo('/detail')
                    break
                case 1:
                    content = document.body.innerHTML
                    expect(content).toEqual('detail')
                    controller.goForward('/notfound')
                    break
                case 2:
                    content = document.body.innerHTML
                    expect(content).toEqual('not found')
                    done()
                    break
            }
            count += 1
        })
        app.history.push('/')
    })

    it('should call controller.destroy when go to another location', () => {
        let count = 0
        controller.destroy = function() {
            count += 1
            expect(count).toBe(1)
        }
        controller.goTo('/detail')
    })
}
