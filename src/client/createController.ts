import { CreateController } from '../share/type'
import { ClientController, ClientControllerConstructor } from './type'

const createController: CreateController<ClientController, ClientControllerConstructor> = (c, location, context) => {
  return new c(location, context)
}
export default createController