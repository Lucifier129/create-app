/**
 * routes
 */

export default [
	{
		path: '/',
		controller: './home/controller'
	}, {
		path: '/home',
		controller: './home/controller'
	}, {
		path: '/list',
		controller: './list/controller'
	}, {
		path: '/detail',
		controller: './detail/controller'
	},  {
		path: '*',
		controller: './home/controller'
	}
]