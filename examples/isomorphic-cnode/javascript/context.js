// context

const base = 'https://cnodejs.org/api/v1'
const createAPI = (path) => (...args) => {
	return `${base}${typeof path === 'function' ? path(...args) : path}`
}

export default {
    api: {
    	topics: createAPI('/topics'),
    	topic: createAPI('/topic'),
    	collect: createAPI('/collect'),
    	uncollect: createAPI('de_collect'),
    	getCollect: createAPI(loginname => `/topic_collect/${loginname}`),
    	reply: createAPI(topicID => `/topic/${topicID}/replies`),
    	like: createAPI(replyID => `/reply/${replyID}/ups`),
    	getUser: createAPI(loginname => `/user/${loginname}`),
    	auth: createAPI('/accesstoken'),
    	getUnreadMessage: createAPI('/message/count'),
    	getMessage: createAPI('/messages'),
    	markAllMessage: createAPI('/message/mark_all'),
    }
}
