/**
 * high order component
 */
import React, { Component } from 'react'
import { accessProp } from './util'

export let connectScroll = (path, InputComponent) => {
    return class OutputComponent extends Component {
        componentDidMount() {
        	let handleScroll = accessProp(this.props, path)
            window.addEventListener('scroll', handleScroll)
        }
        componentWillUnmount() {
            let handleScroll = accessProp(this.props, path)
            window.removeEventListener('scroll', handleScroll)
        }
        render() {
            return <InputComponent {...this.props} />
        }
    }
}

export let addClassName = ({ path, target, className }, InputComponent) => {
    return class OutputComponent extends Component {
        componentDidUpdate() {
            let shouldHide = accessProp(this.props, path)
            let method = shouldHide ? 'add' : 'remove'
            target
            .reduce((elems, selector) => {
                return elems.concat(Array.from(document.querySelectorAll(selector)))
            }, [])
            .map(elem => {
                elem.classList[method](className)
            })
        }
        render() {
            return <InputComponent {...this.props} />
        }
    }
}