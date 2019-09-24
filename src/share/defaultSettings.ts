import { Settings, ControllerConstructor } from './type'

export const isClient: boolean = typeof window !== 'undefined'
export const isServer: boolean = !isClient

const defaultAppSettings: Settings = {
	container: '#container',
	basename: '',
	context: {
		isServer,
		isClient
	},
	type: 'createHashHistory',
	loader: (value: ControllerConstructor) => value
}

export default defaultAppSettings