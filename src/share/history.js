/**
 * custom history import
 */

// HTML5 history
import createHistory from 'history/lib/createBrowserHistory'

// Hash history
import createHashHistory from 'history/lib/createHashHistory'

// query support
import useQueries from 'history/lib/useQueries'

// beforeunload support
import useBeforeUnload from 'history/lib/useBeforeUnload'

// basename support
import useBasename from 'history/lib/useBasename'

export default {
	createHistory,
	createHashHistory,
	useQueries,
	useBeforeUnload,
	useBasename,
}