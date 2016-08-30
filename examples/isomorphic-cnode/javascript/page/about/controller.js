import Controller from '../../share/BaseController'
import React, { Component } from 'react'
import { openMenu, closeMenu } from '../../share/methods'
import Header from '../../component/Header'

export default class extends Controller {
    name = 'About'
    View = About
    actions = {
    	UPDATE_FIELD(state, { key, value }) {
    		if (state[key] === value) {
				return state
			}
			return {
				...state,
				[key]: value,
			}
    	}
    }
    initialState = {
        showMenu: false,
    }
    methods = {
        openMenu,
        closeMenu,
    }
}

function About({ state, methods }) {
	let {
		showMenu,
		userInfo,
		location,
	} = state

	let {
		openMenu,
		closeMenu,
	} = methods

	return (
		<div>
			<Header
				pageType="关于"
				fixHead={true}
				needAdd={true}
				showMenu={showMenu}
				openMenu={openMenu}
				closeMenu={closeMenu}
				userInfo={userInfo}
				location={location}
			/>
		    <dl className="about-info">
		        <dt>关于项目</dt>
		        <dd>该项目是基于Cnodejs的api，采用vue.js重写的webapp。</dd>
		        <dt>源码地址</dt>
		        <dd>
		            <a href="https://github.com/Lucifier129/create-app">
		                https://github.com/Lucifier129/create-app</a>
		        </dd>
		        <dt>意见反馈</dt>
		        <dd>
		            <a href="https://github.com/Lucifier129/create-app/issues">
		                发表意见或者提需求</a>
		        </dd>
		        <dt>当前版本</dt>
		        <dd>V1.0</dd>
	    	</dl>
	    </div>
	)
}