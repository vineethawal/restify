const bindController = (Model) => {
  const Controller = {}
  if (Model.get) {
    Controller.get = (id) => {
      return Model.get(id)
    }
  }

  if (Model.post) {
    Controller.post = (data) => {
      return Model.post(data)
    }
  }

  if (Model.put) {
    Controller.put = ({id, data} = {}) => {
      return Model.put({id, data})
    }
  }

  if (Model.delete) {
    Controller.delete = (id) => {
      return Model.delete(id)
    }
  }

  if (Model.search) {
    Controller.search = ({query, sort = {}, limit = null, select = {}} = {}) => {
      return Model.search({query, sort, limit})
    }
  }
  return Controller
}

export default bindController
