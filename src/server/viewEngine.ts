/**
 * default view engine for server
 */
import { ViewEngine } from '../share/constant'
const render = html => {
	if (typeof html === 'string') {
    return html
  } else {
    return html.toString()    
  }
}

const viewEngine: ViewEngine = {
  render
}
export default viewEngine