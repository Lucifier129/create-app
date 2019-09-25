import { CreateController } from '../share/type'
import { ServerController } from './type'

const createController: CreateController<ServerController> = (c, location, context) => {
  return new c(location, context)
}
export default createController