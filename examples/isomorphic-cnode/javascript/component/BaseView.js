import React, { Component, Children } from 'react'

export default class BaseView extends Component {
	getChildContext() {
		let { context } = this.props
		return context
	}
	render() {
		return Children.only(this.props.children)
	}
}