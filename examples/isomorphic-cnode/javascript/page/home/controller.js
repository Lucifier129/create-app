import Controller from '../../lib/BaseController'
import View from './view'
import * as actions from './model'

export default class extends Controller {
    name = 'List'
    View = View
    actions = actions
    initialState = {
    	topics: [],
    	showMenu: false,
        searchKey: {
            page: 1,
            limit: 20,
            tab: 'all',
            mdrender: true
        },
        userInfo: {},
    }
    methods = {
        openMenu() {
        	let { SET_MENU_STATUS } = this.store.actions
            
        	SET_MENU_STATUS(true)
        },
        closeMenu() {
        	let { SET_MENU_STATUS } = this.store.actions

        	SET_MENU_STATUS(false)
        },
        handleScroll() {
            let { FETCH_NEXT_TOPICS } = this.store.actions
            let scrollHeight = window.innerHeight + window.scrollY
            let pageHeight = document.body.clientHeight + document.body.scrollHeight

            if (pageHeight - scrollHeight <= 200) {
                FETCH_NEXT_TOPICS()
            }
        },
    }
}
