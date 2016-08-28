import Controller from '../../lib/BaseController'
import View from './view'
import * as actions from './model'

export default class Index extends Controller {
	View = View
	actions = actions
	initialState = {

	}
	methods = {
		test() {
			
		}
	}
}
