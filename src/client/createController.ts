import { CreateController } from '../share/type'
import { ClientController } from './type'

const createController: CreateController<ClientController> = (c, location, context) => {
  return new c(location, context)
}
export default createController