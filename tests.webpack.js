const context = require.context('./test', true, /-test\.jsx?$/)
context.keys().forEach(context)

console.log(context.keys())
