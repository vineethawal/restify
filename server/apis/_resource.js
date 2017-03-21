import controllers from '../controllers'
import _base from './_base'

const apis = (product) => {
  const Controller = controllers[product]
  const Api = _base(Controller)

  return Api
}

export default apis
