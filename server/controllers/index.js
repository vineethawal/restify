import resourceController from './_resources'

const Controllers = {}

__RESOURCES__.forEach((resource) => {
  Controllers[resource] = resourceController(resource)
})

export default Controllers
