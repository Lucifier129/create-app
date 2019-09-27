import { CreateController } from '../lib/type'
import { ClientController, ClientControllerConstructor } from './type'

const createController: CreateController<ClientController, ClientControllerConstructor> = (c, location, context) => {
  return new c(location, context)
}
export default createController