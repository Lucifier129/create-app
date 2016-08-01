/**
 * routes
 */

export default [
	{
		path: '/(home)?',
		controller: './home/controller'
	}, {
		path: '/list',
		controller: './list/controller'
	}, {
		path: '/detail',
		controller: './detail/controller'
	},  {
		path: '*',
		controller: './detail/controller'
	}
]