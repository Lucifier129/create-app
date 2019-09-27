/**
 * default view engine for server
 */
import { ViewEngineRender, ViewEngine } from '../lib/type'
import { ServerController } from './type'

interface ToString {
  toString(): string
  [propName: string ]: any
  [propName: number ]: any
}
const render: ViewEngineRender<ServerController> = html => {
	if (typeof html === 'string') {
    return html
  } else {
    return (html as ToString).toString()    
  }
}

const viewEngine: ViewEngine<ServerController> = {
  render
}
export default viewEngine