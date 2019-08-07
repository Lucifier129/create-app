import execSteps from './squences/execSteps'
import createApp from '../src/client'
import { getController, Home, List, Detail, Restore, NotFound } from './squences/classes'
import { App, Context, CreateHistoryType, Settings, Controller } from '../src/share/constant'
import { Route } from '../src/share/createMatcher'

let app: App
let context: Context

describe('createApp-client', () => {

    describe('result', () => {
        it('should return an object', () => {
            let app = createApp({
                routes: [],
            })
            expect(typeof app).toBe('object')
            expect(typeof app.start).toBe('function')
            expect(typeof app.stop).toBe('function')
            expect(typeof app.history).toBe('object')
            expect(typeof app.render).toBe('function')
        })
    })

    describe('feature: hash history', () => {
        describeTest('createHashHistory')
    })

    describe('feature: pushState history', () => {
        describeTest('createHistory')
    })
})


const describeTest: (type: CreateHistoryType) => void = (type) => {
    let initApp: (settings: Settings) => Promise<{}> = (settings) => {
        // clear app and document.body
        if (app) {
            app.stop()
            document.body.innerHTML = ''
            window.location.hash = ''
        }

        context = {
            location: {}
        }

        app = createApp({
            container: 'body',
            basename: '/abc',
            ...settings,
            type,
            context,
        })
        return new Promise(resolve => {
            // do not match current location
            app.start(resolve, false)
            let targetPath = `/random${Math.random().toString(36).substr(2, 6)}`
                // render random location by default
            app.history.push(targetPath)
        })
    }

    describe('works without custom loader', () => {
        beforeEach(() => {
            let routes: Route[] = [{
                path: '/(home|debug.html)?',
                controller: Home as Controller,
            }, {
                path: '/list',
                controller: List as Controller,
            }, {
                path: '/detail',
                controller: Detail as Controller,
            }, {
                path: '/restore',
                controller: Restore as Controller,
            }, {
                path: '*',
                controller: NotFound as Controller,
            }]

            return initApp({
                routes,
            })
        })
        createTest()
    })

    describe('works with custom loader', () => {
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
            path: '/restore',
            controller: 'restore',
        }, {
            path: '*',
            controller: '*',
        }]

        describe('sync mode', () => {
            beforeEach(() => {
                let loader = (controller: string) => {
                    let iController: Controller
                    switch (controller) {
                        case 'home':
                          iController = <Controller>Home
                            break
                        case 'list':
                          iController = <Controller>List
                            break
                        case 'detail':
                          iController = <Controller>Detail
                            break
                        case 'restore':
                          iController = <Controller>Restore
                            break
                        default:
                          iController = <Controller>NotFound
                    }
                    return iController
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
                        case 'restore':
                            Controller = Restore
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
        let container = getController().getContainer()
        expect(container).toBe(document.querySelector('body'))
    })

    it('should match browser location and render page', (done) => {
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                done()
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should refresh view when calling container.refreshView', (done) => {
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')

                document.body.innerHTML = ''

                content = document.body.innerHTML
                expect(content).toEqual('')

                getController().refreshView()
                content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should go to another location and render page', (done) => {
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                app.history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location.pathname).toEqual('/detail')
                done()
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should wait for promise resolved when controller.init return promise', (done) => {
        let start: number
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                start = (new Date()).getTime()
                app.history.push('/list')
            },
            location => {
                let content = document.body.innerHTML
                expect(location.pathname).toEqual('/list')
                expect(content).toEqual('list')
                expect((new Date()).getTime() - start >= 50).toBe(true)
                done()
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should go to another location when calling history method', (done) => {
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                getController().history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location.pathname).toEqual('/detail')
                getController().history.replace('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')
                expect(location.pathname).toEqual('/notfound')
                done()
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should call controller.destroy when go to another location', () => {
        let count = 0
        getController().destroy = function() {
            count += 1
            expect(count).toBe(1)
        }
        getController().history.push('/detail')
    })

    it('should cache controller when KeepAlive is true and call controller.restore when page did back', (done) => {
        let restore = null
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                getController().history.push('/restore')
            },
            location => {
                let content = document.body.innerHTML
                restore = getController()
                expect(content).toEqual('restore')
                expect(location.pathname).toEqual('/restore')
                expect(getController().count).toEqual(0)
                getController().history.push('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')
                expect(location.pathname).toEqual('/notfound')
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('restore')
                expect(location.pathname).toEqual('/restore')
                expect(getController() === restore).toBe(true)
                expect(getController().count).toEqual(1)
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                getController().history.goForward()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('restore')
                expect(getController() === restore).toEqual(true)
                expect(getController().count).toEqual(2)
                expect(location.pathname).toEqual('/restore')
            },
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should support async controller.restore method', (done) => {
        let start
        let restore = null
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                getController().history.push('/restore')
            },
            location => {
                let content = document.body.innerHTML
                restore = getController()
                expect(content).toEqual('restore')
                expect(location.pathname).toEqual('/restore')
                expect(getController().count).toEqual(0)
                getController().history.push('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')
                expect(location.pathname).toEqual('/notfound')
                
                let _restore = restore.restore
                restore.restore = function(location, context) {
                    expect(location === this.location).toEqual(false)
                    expect(location.raw).toEqual(this.location.raw)
                    expect(context).toEqual(this.context)
                    return new Promise(resolve => setTimeout(resolve, 50))
                    .then(() => _restore.call(this, location, context))
                }

                start = Date.now()
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('restore')
                expect(getController() === restore).toBe(true)
                expect(getController().count).toEqual(1)
                expect(Date.now() - start > 50).toEqual(true)
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should support cache controller manually by calling saveToCache method', (done) => {
        let controller = null
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                controller = getController()
                controller.saveToCache()
                controller.history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location.pathname).toEqual('/detail')
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                expect(getController() === controller).toEqual(true)
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should support remove controller cache manually by calling removeFromCache method', (done) => {
        let controller = null
        let steps = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                controller = getController()
                controller.saveToCache()
                controller.history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location.pathname).toEqual('/detail')
                controller.removeFromCache()
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location.pathname).toEqual('/')
                expect(getController() !== controller).toEqual(true)
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })
}
