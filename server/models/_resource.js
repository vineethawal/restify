import {mongoose} from '../libs/connectors'

import {
  _fields,
  _model,
} from './_base'

const fields = Object.assign({},
  _fields
)

const model = (resource) => {
  const schema = new mongoose.Schema(fields, {
    strict: false,
  })

  const Model = mongoose.model(resource, schema)
  _model(Model)

  return Model
}

export default model
