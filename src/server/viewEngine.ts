/**
 * default view engine for server
 */
import { ViewEngineRender, ViewEngine, AppElement } from '../share/type'

interface ToString {
  toString(): string
  [propName: string ]: any
  [propName: number ]: any
}
const render: ViewEngineRender = html => {
	if (typeof html === 'string') {
    return html
  } else {
    return (html as ToString).toString()    
  }
}

const viewEngine: ViewEngine = {
  render
}
export default viewEngine