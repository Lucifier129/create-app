import { CreateController } from '../lib/type'
import { ServerController, ServerControllerConstructor } from './type'

const createController: CreateController<ServerController, ServerControllerConstructor> = (c, location, context) => {
  return new c(location, context)
}
export default createController