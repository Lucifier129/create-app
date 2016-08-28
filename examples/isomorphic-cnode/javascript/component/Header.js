import React, { Component } from 'react'
import classnames from 'classnames'
import Menu from './Menu'

export default function Header() {
	let {
		showMenu,
		fixHead,
		needAdd,
		openMenu,
		closeMenu,
		messageCount,
		userInfo,
		location,
	} = this.props
	let headClassName = classnames({
		'show': showMenu && fixHead,
		'fix-head': fixHead,
		'no-fix': !fixHead
	})
	return (
		<div>
		{ showMenu && fixHead &&
			<div className="page-cover" onClick={closeMenu}></div>
		}
			<header id="hd" className={headClassName}>
				<div className="nv-toolbar">
				{ fixHead &&
					<div className="toolbar-nav" onClick={openMenu}></div>
				}
					<span v-text="pageType"></span>
				{ messageCount && messageCount > 0 &&
					<i className="num">{messageCount}</i>
				}
				{ needAdd && (!messageCount || messageCount <= 0) &&
					<Link tagName="i" className="iconfont add-icon" to={`/add`}>&#xe60f;</Link>
				}
				</div>
			</header>
			{ fixHead &&
				<Menu
					showMenu={showMenu}
					userInfo={userInfo}
					location={location}
				/>
			}
			</div>
		)
}