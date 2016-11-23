import createApp from 'create-app/client'
import ReactDOM from 'react-dom'
import routes from './routes'

const webpackLoader = async (loadModule) => {
	let module = await new Promise(loadModule)
	return module.default || module
}

const viewEngine = {
    render: (component, container) => {
        return ReactDOM.render(component, container)
    },
}

const app = createApp({
	type: 'createHistory',
	basename: '/examples/simple-spa',
    container: '#container',
    routes: routes,
    loader: webpackLoader,
    viewEngine: viewEngine,
})

app.start()
