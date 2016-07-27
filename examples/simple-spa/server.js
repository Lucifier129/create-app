var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')
var querystring = require('querystring')
require('isomorphic-fetch')
require('babel/register')

console.log(fetch)

var createApp = path.join(__dirname, '..', '..', 'src')
var spa = path.join(__dirname, 'src')

var basename = '/examples/simple-spa'

var routes = require(`${spa}/routes`).map(route => {
	controller = path.join(spa, route.controller)
	return {
		path: route.path,
		controller: controller,
	}
})

var commonjsLoader = (url, initController) => {
	var Controller = require(url)
	return initController(Controller)
}

var ReactDOMServer = require('react-dom/server')

var viewEngine = {
	render: component => {
		return ReactDOMServer.renderToString(component)
	}
}

var appSettings = {
	basename: basename,
	viewEngine: viewEngine,
	loader: commonjsLoader,
	routes: routes,
}

var createApp = require(`${createApp}/server`)
var app = createApp(appSettings)

var indexFile = fs.readFileSync('index.html').toString()

var server = http.createServer(function(req, res) {

	res.on('error', console.error.bind(console))

	// handle javascript file
	if (/\.js/.test(req.url)) {
		var filepath = req.url.replace(basename, '')
		var file = path.join(__dirname, filepath)
		res.writeHead(200, {
			'Content-Type': 'text/javascript'
		})
		readFile(file).pipe(res)
		return
	}

	var urlObj = url.parse(req.url)
	var query = urlObj.query ? querystring.parse(urlObj.query) : {}
	var location = {
		pathname: urlObj.pathname,
		search: urlObj.search || '',
		query: query,
		basename: basename,
	}

	var match = app.matchPathname(location.pathname)

	// handle routes
	if (match && match.path !== '*') {
		var content = app.matchController(location)
		res.writeHeader(200, {
			'Content-Type': 'text/html'
		})
		if (typeof content === 'string') {
			res.end(render(content))
		} else {
			content.then(content => res.end(render(content)))
		}
		return
	}

	// handle index page
	if (req.url === '/') {
		res.writeHeader(200, {
			'Content-Type': 'text/html'
		})
		res.end(indexFile)
		return
	}

	// handle 404
	res.writeHead(404)
	res.end('not found')
})

server.listen(3001)

console.log('server start at 3001')

function readFile(file) {
	return fs.createReadStream(file)
}

function render(content) {
	return indexFile.replace(`<div id="container"></div>`, `<div id="container">${content}</div>`)
}