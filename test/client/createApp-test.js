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
            describeTest({
                type: "createHashHistory",
            })
        })
        describe('pushState history', () => {
            describeTest({
                type: 'createHistory',
            })
        })
    })
})


function describeTest(appSettings) {
    let initApp = (settings) => {
        // clear app and document.body
        if (app) {
            app.stop()
            document.body.innerHTML = ''
        }

        app = createApp({
            container: 'body',
            ...settings,
        })

        let isHome = app.history.getCurrentLocation().pathname === '/'

        return new Promise((resolve) => {
            if (isHome) {
                app.start(resolve)
            } else {
                // reset location
                app.start(resolve, false)
                app.history.push('/')
            }
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
                ...appSettings,
                routes,
            })
        })
        createTest()
    })

    // describe('works with loader', () => {
    //     let routes = [{
    //         path: '/(home|debug.html)?',
    //         controller: 'home',
    //     }, {
    //         path: '/list',
    //         controller: 'list',
    //     }, {
    //         path: '/detail',
    //         controller: 'detail',
    //     }, {
    //         path: '*',
    //         controller: '*',
    //     }]

    //     describe('callback style', () => {
    //         beforeEach(() => {
    //             let loader = (controller, init) => {
    //                 switch (controller) {
    //                     case 'home':
    //                         init(Home)
    //                         break
    //                     case 'list':
    //                         init(List)
    //                         break
    //                     case 'detail':
    //                         init(Detail)
    //                         break
    //                     default:
    //                         init(NotFound)
    //                 }
    //             }
    //             return initApp({
    //             	...appSettings,
    //             	routes,
    //             	loader,
    //             })
    //         })
    //         createTest()
    //     })

        // beforeEach(() => {

        // })
    // })
}

function createTest() {

    it('should match browser location and render page', (done) => {
        app.history.listen(() => {
            let content = document.body.innerHTML
            expect(content).toEqual('home')
        })

    })

    it('should get container by controller.getContainer', () => {
        let container = controller.getContainer()
        expect(container).toBe(document.querySelector('body'))
    })

    it('should refresh view when calling container refreshView', () => {
        let content = document.body.innerHTML
        expect(content).toEqual('home')

        document.body.innerHTML = ''

        content = document.body.innerHTML
        expect(content).toEqual('')

        controller.refreshView()
        content = document.body.innerHTML
        expect(content).toEqual('home')
    })

    it('should go to another location and render page', (done) => {
        app.history.listen(() => {
            let content = document.body.innerHTML
            expect(content).toEqual('detail')
            done()
        })
        app.history.push('/detail')
    })

    it('should wait for promise resolved when controller.init return promise', (done) => {
        app.history.push('/list')

        let content = document.body.innerHTML
        expect(content).toEqual('home')

        setTimeout(() => {
            let content = document.body.innerHTML
            expect(content).toEqual('list')
            done()
        }, 50)
    })

    it('should call controller.destroy when go to another location', () => {
        let count = 0
        controller.destroy = function() {
            count += 1
            expect(count).toBe(1)
        }
        controller.goTo('/detail')
    })

    it('should go to another location when calling controller#goX method', (done) => {
        let steps = [
            location => {
                controller.goTo('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')

                controller.goTo('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')

                controller.goTo('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')

                controller.goTo('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')
            }
        ]
        execSteps(steps, app.history, done)
    })
}
