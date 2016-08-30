import Controller from '../../share/BaseController'
import View from './view'
import * as actions from './model'
import { openMenu, closeMenu } from '../../share/methods'

export default class extends Controller {
    name = 'Detail'
    View = View
    actions = actions
    initialState = {
    	showMenu: false,
    	topic: null,
    	curReplyId: null,
    }

    methods = {
    	openMenu,
    	closeMenu,
    	upReply() {

    	},
    	addReply() {

    	},
    	isUps() {

    	},
    }
}