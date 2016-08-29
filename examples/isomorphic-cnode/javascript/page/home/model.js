/**
 * actions of model
 */
import querystring from 'querystring'
import api from '../../api'

export let INIT = async (state) => {
	let { searchKey, topics } = state

	if (topics.length > 0) {
		return state
	}

	let search = querystring.stringify(searchKey)
	let response = await fetch(`${api.topics()}?${search}`)
	let { data } = await response.json()

	return {
		...state,
		topics: data,
	}
}

export let FETCH_NEXT_TOPICS = async (state) => {
	let { searchKey, topics } = state

	searchKey = {
		...searchKey,
		page: searchKey.page + 1,
	}

	let search = querystring.stringify(searchKey)
	let response = await fetch(`${api.topics()}?${search}`)
	let { data } = await response.json()

	topics = topics.concat(data)

	return {
		...state,
		searchKey,
		topics,
	}
}

export let SET_MENU_STATUS = (state, showMenu = false) => {
	return {
		...state,
		showMenu,
	}
}