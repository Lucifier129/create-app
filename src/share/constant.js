/*
  key/value configs
*/
export const isClient = typeof window !== 'undefined'
export const isServer = !isClient
export const defaultAppSettings = {
	basename: '',
	context: {},
	type: 'createHistory',
}