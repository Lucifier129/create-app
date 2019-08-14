import CA from './types'

export const isClient: boolean = typeof window !== 'undefined'
export const isServer: boolean = !isClient

const defaultAppSettings: CA.Settings = {
	container: '#container',
	basename: '',
	context: {
		isServer,
		isClient
	},
	type: 'createHashHistory',
	loader: value => value as CA.ControllerConstructor
}

export default defaultAppSettings