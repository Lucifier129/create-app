import { CreateController } from './type'

const createController: CreateController = (c, location, context) => {
  return new c(location, context)
}
export default createController