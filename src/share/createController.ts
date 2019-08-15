import CA from './types'

const createController: CA.CreateController = (c, location, context) => {
  return new c(location, context)
}
export default createController