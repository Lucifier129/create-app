var ncp = require('ncp').ncp

ncp.limit = 16;

ncp('./src/share/types.d.ts', './dist/types/share/types.d.ts')
ncp('./src/client/index.d.ts', './dist/types/client/index.d.ts')
ncp('./src/server/index.d.ts', './dist/types/server/index.d.ts')