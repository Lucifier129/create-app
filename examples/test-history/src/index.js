import { createHashHistory, createHistory } from 'history'

let history = createHashHistory({
	hashType: 'hashbang',
})
// let history = createHistory()

let listener = (location) => {
	console.log(location.action, location)
}

let unlistener = history.listen(listener)


history.push(createRandomPath())

// setTimeout(() => {
// 	history.push(createRandomPath())
// }, 1000)


function createRandomPath() {
	return `/random-${Math.random().toString(36).substr(2)}`
}