// base controller class
import { createStore, createLogger } from 'relite'

export default class Controller {
	constructor(location, context) {
		this.location = location
		this.context = context
		this.refreshView = this.refreshView.bind(this)
		this.render = this.render.bind(this)
	}
	async init() {
		let { initialState, actions, context, methods } = this
		let store = this.store = createStore(actions, {
			...context,
			...initialState,
		})
		let logger = createLogger({
			name: this.constructor.name
		})
		store.subscribe(logger)
		store.subscribe(this.refreshView)

		this.methods = Object.keys(methods).reduce((obj, key) => {
			obj[key] = methods[key].bind(this)
			return obj
		}, {})


		let { INIT } = store.actions
		await INIT()
		return this.render()
	}
	render() {
		let { View, store, methods } = this
		return (
			<View state={store.getState()} methods={methods} />
		)
	}
}