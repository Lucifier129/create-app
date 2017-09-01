/*
  key/value configs
*/
export const isClient = typeof window !== 'undefined'
export const isServer = !isClient
export const defaultAppSettings = {
	container: '#container',
	basename: '',
	context: {
		isServer,
		isClient,
	},
	type: 'createHashHistory',
	loader: value => value,
}