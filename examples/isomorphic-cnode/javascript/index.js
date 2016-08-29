import 'isomorphic-fetch'
import ReactDOM from 'react-dom'
import Fastclick from 'fastclick'
import createApp from 'create-app/client'
import routes from './routes'

const webpackLoader = (url) => (
    new Promise(require(url))
    .then(module => module.default || module)
)

const viewEngine = {
	render(component, container) {
		return ReactDOM.render(component, container)
	},
}

const appSettings = {
	type: 'createHashHistory',
	hashType: 'hashbang',
	// basename: '/examples/isomorphic-cnode',
	container: '#root',
	context: {
		isClient: true,
		isServer: false,
	},
	loader: webpackLoader,
	routes,
	viewEngine,
}

const app = createApp(appSettings)

app.start()

if ('ontouchstart' in document) {
	Fastclick.attach(document.body)
}