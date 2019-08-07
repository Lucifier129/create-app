/**
 * default view engine for server
 */
import { ViewEngine } from '../share/constant'
const render = html => html.toString()

const viewEngine: ViewEngine = {
  render
}
export default viewEngine