# create-app
configuring once, rendering both client and server.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save create-app

```js
// using an ES6 transpiler, like babel
import createApp from 'create-app/client'
createApp()

import createApp from 'create-app/server'
createApp()

// not using an ES6 transpiler
var createApp = require('create-app/client')
var createApp = require('create-app/server')
```

## Basic Usage
```js
import createApp from 'create-app/client'

const app = createApp({
  container: 'body',
  basename: '/abc',
})

app.start(resolve, false)

let targetPath = `/random${Math.random().toString(36).substr(2, 6)}`
app.history.push(targetPath)
```