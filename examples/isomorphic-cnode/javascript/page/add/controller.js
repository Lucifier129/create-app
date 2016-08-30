import Controller from '../../share/BaseController'
import View from './view'
import * as actions from './model'
import { openMenu, closeMenu } from '../../share/methods'

export default class extends Controller {
    name = 'Add'
    needLogin = true
    View = View
    actions = actions
    initialState = {
        showMenu: false,
        tabs: [{
            type: 'share',
            text: '分享',
        }, {
            type: 'ask',
            text: '问答',
        }, {
            type: 'job',
            text: '招聘',
        }],
        tab: 'share',
        title: '',
        content: '',
        err: '',
        topic_id: '',
        suffix: '<br/><br/><a class="from" href="https://github.com/Lucifier129/create-app">I\'m webapp-cnodejs-react</a>',
    }

    methods = {
        openMenu,
        closeMenu,

        async addTopic() {
            let { UPDATE_FIELD, ADD_TOPIC } = this.store.actions

            try {
                let { topic_id } = await ADD_TOPIC()
                this.goReplace(`/topic/${topic_id}`)
            } catch(error) {
                alert(error.message)
            }
        },
        updateTitle({ currentTarget }) {
            let { UPDATE_FIELD } = this.store.actions
            let { value } = currentTarget

            UPDATE_FIELD({
                key: 'title',
                value,
            })
        },
        updateContent({ currentTarget }) {
            let { UPDATE_FIELD } = this.store.actions
            let { value } = currentTarget

            UPDATE_FIELD({
                key: 'content',
                value,
            })
        },
        updateTab({ currentTarget }) {
            let { UPDATE_FIELD } = this.store.actions
            let { value } = currentTarget

            UPDATE_FIELD({
                key: 'tab',
                value,
            })
        },
    }
}
