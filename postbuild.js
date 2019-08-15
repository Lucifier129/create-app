var ncp = require('ncp').ncp

ncp.limit = 16;

ncp('./src/share/types.d.ts', './dist/types/share/types.d.ts')