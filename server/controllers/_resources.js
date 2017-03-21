import models from '../models'
import _base from './_base'

const controller = (resource) => {
  const Model = models[resource]
  const Controller = _base(Model)

  return Controller
}

export default controller
