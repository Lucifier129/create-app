import React, { Component } from 'react'
import classnames from 'classnames'

export default function Reply({ hasErr, content, addReply }) {
	let className = {
		'text': true,
		'err': hasErr,
	}
	return (
		<section className="reply">
	        <textarea
	        	id="content"
	        	rows="8"
	        	className={className}
	            placeholder='回复支持Markdown语法,请注意标记代码'>
	            { content }
	        </textarea>
	        <a className="button" onClick={addReply}>确定</a>
	    </section>
	)
}