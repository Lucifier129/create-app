/*
  key/value configs
*/
export const isClient = typeof window !== 'undefined'
export const isServer = !isClient
export const locationDefaults = {
    useHash: true,
    parseQuery: true,
    rootPath: '',
    hashPrefix: '!',
}