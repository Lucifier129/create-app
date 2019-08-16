/**
 * default view engine for server
 */
import CA from './index'
interface ToString {
  toString()
  [propName: string ]: any
  [propName: number ]: any
}
const render: CA.ViewEngineRender<string | ToString> = html => {
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