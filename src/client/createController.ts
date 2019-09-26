import { CreateController } from '../share/type'
import { IntactController, IntactControllerConstructor } from './type'

const createController: CreateController<IntactController, IntactControllerConstructor> = (c, location, context) => {
  return new c(location, context)
}
export default createController