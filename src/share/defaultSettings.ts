import { Settings, ControllerConstructor, Controller } from './type'

export const isClient: boolean = typeof window !== 'undefined'
export const isServer: boolean = !isClient

const defaultAppSettings: Settings<Controller> = {
	container: '#container',
	basename: '',
	context: {
		isServer,
		isClient
	},
	type: 'createHashHistory',
	loader: (value) => value as ControllerConstructor
}

export default defaultAppSettings