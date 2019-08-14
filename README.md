# create-app
configuring once, rendering both client and server.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save create-app

```js
// using an ES6 transpiler, like babel
import createApp from 'create-app'

createApp.client()
createApp.server()

// not using an ES6 transpiler
var client = require('create-app').client
var server = require('create-app').server
```

## Basic Usage
```js
import createApp from 'create-app'

const app = createApp.client({
  container: 'body',
  basename: '/abc',
})

app.start(resolve, false)

let targetPath = `/random${Math.random().toString(36).substr(2, 6)}`
app.history.push(targetPath)
```