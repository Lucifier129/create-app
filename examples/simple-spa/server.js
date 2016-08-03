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


	// handle page
	app.render(req.url, (error, content) => {
		if (error) {
			// handle 404
			res.writeHead(404)
			res.end(JSON.stringify(error.message))
			return
		}
		res.writeHeader(200, {
			'Content-Type': 'text/html'
		})
		res.end(render(content))
	})
})

server.listen(3002)

console.log('server start at 3001')

function readFile(file) {
	return fs.createReadStream(file)
}

function render(content) {
	return indexFile.replace(`<div id="container"></div>`, `<div id="container">${content}</div>`)
}