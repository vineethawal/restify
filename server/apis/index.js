import resourceApis from './_resource'

const Apis = {}

__RESOURCES__.forEach((resource) => {
  Apis[resource] = resourceApis(resource)
})

export default Apis
