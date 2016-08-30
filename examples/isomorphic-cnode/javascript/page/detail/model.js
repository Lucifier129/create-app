/**
 * actions of method
 */
import { getTopic } from '../../service'


export let INIT = async (state) => {
	let { location, topic } = state

	if (topic) {
		return state
	}

	let { topicId } = location.params
	let { data } = await getTopic(topicId)

	topic = data

	return {
		...state,
		topic,
	}
}

export let UPDATE_FIELD = (state, { key, value }) => {
	if (state[key] === value) {
		return state
	}
	return {
		...state,
		[key]: value,
	}
}