/**
 * default view engine for server
 */
import { ViewEngineRender, ViewEngine } from '../share/type'

interface ToString {
  toString()
  [propName: string ]: any
  [propName: number ]: any
}
const render: ViewEngineRender<string | ToString> = html => {
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