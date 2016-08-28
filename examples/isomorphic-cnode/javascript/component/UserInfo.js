import React, { Component } from 'react'
import Link from './Link'

export default function UserInfo({ location, userInfo }) {
	return (
		<div className="user-info">
		{ userInfo && userInfo.loginname
			? <Login location={location} />
			: <User userInfo={userInfo}  />
		}
	    </div>
	)
}

function Login({ location }) {
	let currentPath = `${location.pathname}${location.search}${location.hash}`
	let targetPath = `/login?redirect=${currentPath}`
	return (
		<ul className="login-no">
			<li className="login">
				<Link to={targetPath}>登录</Link>
			</li>
		</ul>
	)
}

function User({ userInfo }) {
	return (
		<Link tagName="div" className="login-yes" to={`/user/${userInfo.loginname}`}>
			<div className="avertar">
			{ userInfo.avatar_url &&
				<img src={userInfo.avatar_url} />
			}
			</div>
			<div className="info">
			{ userInfo.loginname &&
				<p>{userInfo.loginname}</p>
			}
			</div>
		</Link>
	)
}