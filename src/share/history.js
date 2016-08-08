/**
 * custom history import
 */

// HTML5 history
import createHistory from 'create-history/lib/createBrowserHistory'

// Hash history
import createHashHistory from 'create-history/lib/createHashHistory'

// query support
import useQueries from 'create-history/lib/useQueries'

// beforeunload support
import useBeforeUnload from 'create-history/lib/useBeforeUnload'

// basename support
import useBasename from 'create-history/lib/useBasename'

export default {
	createHistory,
	createHashHistory,
	useQueries,
	useBeforeUnload,
	useBasename,
}