/**
 * routes
 */

export default [
	{
		path: '/(home)?',
		controller: require('./home/controller'),
	}, {
		path: '/list',
		controller: require('./list/controller'),
	}, {
		path: '/detail',
		controller: require('./detail/controller'),
	},  {
		path: '*',
		controller: require('./detail/controller'),
	}
]