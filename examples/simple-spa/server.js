import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import querystring from 'querystring'

import routes from './src/routes'
import createApp from '../../src/server'
import ReactDOMServer from 'react-dom/server'

var finalRoutes = routes.map(route => {
	var controller = path.join(__dirname, 'src', route.controller)
	return {
		path: route.path,
		controller: controller,
	}
})

var commonjsLoader = url => {
	var module = require(url)
	return module.default || module
}

var viewEngine = {
	render: ReactDOMServer.renderToString
}
var basename = '/examples/simple-spa'
var appSettings = {
	basename: basename,
	viewEngine: viewEngine,
	loader: commonjsLoader,
	routes: finalRoutes,
}

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
			console.log(error)
			return
		}
		res.writeHeader(200, {
			'Content-Type': 'text/html'
		})
		res.end(render(content))
	})
})

var port = 3002

server.listen(port)

console.log(`server start at ${port}`)

function readFile(file) {
	return fs.createReadStream(file)
}

function render(content) {
	return indexFile.replace(`<div id="container"></div>`, `<div id="container">${content}</div>`)
}