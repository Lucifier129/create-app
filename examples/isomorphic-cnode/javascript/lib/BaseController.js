// base controller class
import React, { Component } from 'react'
import { createStore, createLogger } from 'relite'
import BaseView from '../component/BaseView'

export default class Controller {
	constructor(location, context) {
		this.location = location
		this.context = context
		this.refreshView = this.refreshView.bind(this)
		this.render = this.render.bind(this)
		this.goTo = this.goTo.bind(this)
	}
	init() {
		let { initialState, actions, context, methods, location } = this
		let userInfo = {
			loginname: '',
			avatar_url: '',
		}
		if (context.isClient) {
			userInfo = localStorage.getItem('userInfo') || userInfo
		}
		let store = this.store = createStore(actions, {
			...context,
			...initialState,
			location,
			userInfo,
		})
		let logger = createLogger({
			name: this.name,
		})
		store.subscribe(this.refreshView)
		store.subscribe(logger)

		this.methods = Object.keys(methods).reduce((obj, key) => {
			obj[key] = methods[key].bind(this)
			return obj
		}, {})

		let { INIT } = store.actions
		return INIT().then(this.render)
	}
	render() {
		let { View, store, methods, context, location, goTo, goReplace } = this
		return (
			<BaseView
				context={context}
				location={location}
				goTo={goTo}
				goReplace={goReplace}
			>
				<View state={store.getState()} methods={methods} />
			</BaseView>
		)
	}
}