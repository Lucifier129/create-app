import createApp from 'create-app/client'
import ReactDOM from 'react-dom'
import routes from './routes'
import config from './config'

const webpackLoader = (url) => (
    new Promise(require(url))
    .then(module => module.default || module)
)

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
