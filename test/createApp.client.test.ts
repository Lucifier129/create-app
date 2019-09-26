import execSteps from './squences/execSteps'
import createApp, { App, Context, Settings, CreateHistoryType, Route, ControllerConstructor, Loader, Controller } from '../src/client'
import { getController, Home, List, Detail, Restore, NotFound } from './squences/classes'
import { Step } from './squences/type'

let app: App
let context: Context


const createTest = () => {

    it('should get container by controller.getContainer', () => {
        let controller = getController()
        if (controller) {
            let container = controller.getContainer()
            expect(container).toBe(document.querySelector('body'))
        }
    })

    it('should match browser location and render page', (done) => {
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                done()
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should refresh view when calling container.refreshView', (done) => {
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')

                document.body.innerHTML = ''

                content = document.body.innerHTML
                expect(content).toEqual('')

                getController().refreshView()
                content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should go to another location and render page', (done) => {
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                app.history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location && location.pathname).toEqual('/detail')
                done()
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should wait for promise resolved when controller.init return promise', (done) => {
        let start: number
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                start = (new Date()).getTime()
                app.history.push('/list')
            },
            location => {
                let content = document.body.innerHTML
                expect(location && location.pathname).toEqual('/list')
                expect(content).toEqual('list')
                expect((new Date()).getTime() - start >= 50).toBe(true)
                done()
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should go to another location when calling history method', (done) => {
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                getController().history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location && location.pathname).toEqual('/detail')
                getController().history.replace('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')
                expect(location && location.pathname).toEqual('/notfound')
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
        let restore: any = null
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                getController().history.push('/restore')
            },
            location => {
                let content = document.body.innerHTML
                restore = getController()
                expect(content).toEqual('restore')
                expect(location && location.pathname).toEqual('/restore')
                expect(getController().count).toEqual(0)
                getController().history.push('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')
                expect(location && location.pathname).toEqual('/notfound')
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('restore')
                expect(location && location.pathname).toEqual('/restore')
                expect(getController() === restore).toBe(true)
                expect(getController().count).toEqual(1)
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                getController().history.goForward()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('restore')
                expect(getController() === restore).toEqual(true)
                expect(getController().count).toEqual(2)
                expect(location && location.pathname).toEqual('/restore')
            },
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should support async controller.restore method', (done) => {
        let start: any
        let restore: any = null
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                getController().history.push('/restore')
            },
            location => {
                let content = document.body.innerHTML
                restore = getController()
                expect(content).toEqual('restore')
                expect(location && location.pathname).toEqual('/restore')
                expect(getController().count).toEqual(0)
                getController().history.push('/notfound')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('not found')
                expect(location && location.pathname).toEqual('/notfound')
                
                let _restore = restore.restore
                restore.restore = function(location: any, context: any) {
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
        let controller: any = null
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                controller = getController()
                controller.saveToCache()
                controller.history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location && location.pathname).toEqual('/detail')
                getController().history.goBack()
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                expect(getController() === controller).toEqual(true)
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })

    it('should support remove controller cache manually by calling removeFromCache method', (done) => {
        let controller: any = null
        let steps: Step[] = [
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                controller = getController()
                controller.saveToCache()
                controller.history.push('/detail')
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('detail')
                expect(location && location.pathname).toEqual('/detail')
                controller.removeFromCache()
                let c = getController()
                if (c && c.history) {
                    c.history.goBack()
                }
            },
            location => {
                let content = document.body.innerHTML
                expect(content).toEqual('home')
                expect(location && location.pathname).toEqual('/')
                expect(getController() !== controller).toEqual(true)
            }
        ]
        execSteps(steps, app.subscribe, done)
        app.history.push('/')
    })
}

const describeTest: (type: CreateHistoryType) => void = (type) => {
    const initApp: (settings: Partial<Settings<Controller>>) => Promise<{}> = (settings) => {
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
            let routes: Route<Controller>[] = [{
                path: '/(home|debug.html)?',
                controller: Home,
            }, {
                path: '/list',
                controller: List,
            }, {
                path: '/detail',
                controller: Detail,
            }, {
                path: '/restore',
                controller: Restore,
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

    describe('works with custom loader', () => {
        let routes: Route[] = [{
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
                let loader: Loader<Controller> = (controller) => {
                    let iController: ControllerConstructor<Controller>
                    switch (controller) {
                        case 'home':
                          iController = Home
                            break
                        case 'list':
                          iController = List
                            break
                        case 'detail':
                          iController = Detail
                            break
                        case 'restore':
                          iController = Restore
                            break
                        default:
                          iController = NotFound
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
                let loader: Loader = (controller) => {
                    let iController: ControllerConstructor
                    switch (controller) {
                        case 'home':
                          iController = Home
                            break
                        case 'list':
                          iController = List
                            break
                        case 'detail':
                          iController = Detail
                            break
                        case 'restore':
                          iController = Restore
                            break
                        default:
                          iController = NotFound
                    }

                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(iController)
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
        describeTest('createBrowserHistory')
    })
})