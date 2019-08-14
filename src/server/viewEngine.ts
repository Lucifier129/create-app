/**
 * default view engine for server
 */
import CA from '../index'
const render = html => {
	if (typeof html === 'string') {
    return html
  } else {
    return html.toString()    
  }
}

const viewEngine: CA.ViewEngine = {
  render
}
export default viewEngine