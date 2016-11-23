import http from 'http'
import fs from 'fs'
import path from 'path'
import createApp from '../../src/server'
import {renderToString} from 'react-dom/server'
import routes from './src/routes'

let appSettings = {
    basename: '/examples/simple-spa',
    viewEngine: {
        render: renderToString
    },
    loader: module => module.default || module,
    routes: routes,
}

let app = createApp(appSettings)

let indexFile = fs.readFileSync(path.join(__dirname, './index.html')).toString()

let server = http.createServer(async function(req, res) {

    res.on('error', console.error.bind(console))

    let url = req.url.replace(appSettings.basename, '')

    // handle javascript file
    if (/\.js/.test(req.url)) {
        res.writeHead(200, {
            'Content-Type': 'text/javascript'
        })
        let file = path.join(__dirname, url)
        readFile(file).pipe(res)
        return
    }

    // handle page
    try {
    	let { controller, content } = await app.render(url)
    	res.writeHeader(200, {
            'Content-Type': 'text/html'
        })
        let html = render(content)
    	res.end(html)
    } catch(error) {
    	res.status(500)
    	res.end(error.stack)
    }
})

let port = 3002

server.listen(port)

console.log(`server start at ${port}`)

function readFile(file) {
    return fs.createReadStream(file)
}

function render(content) {
    return indexFile.replace(
    	`<div id="container"></div>`,
    	`<div id="container">${content}</div>`
    )
}
