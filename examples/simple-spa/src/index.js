import createApp from 'create-app/client'
import ReactDOM from 'react-dom'
import routes from './routes'
import config from './config'
import 'isomorphic-fetch'
import * as History from 'history'

const webpackLoader = (url, initController) => {
    var load = require(url)
    load(module => {
        let Controller = module.default || module
        return initController(Controller)
    })
}

const viewEngine = {
    render: (component, container) => {
        return ReactDOM.render(component, container)
    },
}

const app = createApp({
    ...config,
    routes: routes,
    loader: webpackLoader,
    viewEngine: viewEngine,
})

app.start()
