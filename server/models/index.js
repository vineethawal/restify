import resourceModel from './_resource'

const Models = {}

__RESOURCES__.forEach((resource) => {
  Models[resource] = resourceModel(resource)
})

export default Models
