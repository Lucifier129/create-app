var ncp = require('ncp').ncp

ncp.limit = 16;

ncp('./src/share/types.d.ts', './dist/types/share')
ncp('./src/client/index.d.ts', './dist/types/client')
ncp('./src/server/index.d.ts', './dist/types/server')