// CRUD services
const bindAPI = (Controller) => {
  const Apis = {}
  // Search(POST/GET) - function => search
  if (Controller.search) {
    Apis.searchPost = {
      verb: 'post',
      url: '/search',
      func: function (req, res, next) {
        const {query = {}, sort = {}, limit = 100, select = {}} = req.body || {}
        try {
          Controller.search({query, sort, limit, select})
            .then((data) => res.send(data))
            .catch(next)
        } catch (err) {
          /* istanbul ignore next */
          next(err)
        }
      },
    }
    Apis.searchGet = {
      verb: 'get',
      url: '/search',
      func: function (req, res, next) {
        let {query = '{}', sort = '{}', limit = 100, select = '{}'} = req.query
        try {
          query = JSON.parse(query)
          sort = JSON.parse(sort)
          select = JSON.parse(select)
          limit = parseInt(limit, 10)
          Controller.search({query, sort, limit, select})
            .then((data) => res.send(data))
            .catch(next)
        } catch (err) {
          next(err)
        }
      },
    }
  }
  // GET - function => get
  if (Controller.get) {
    Apis.get = {
      verb: 'get',
      url: '/:id',
      func: function (req, res, next) {
        Controller.get(req.params.id).then((data) => res.send(data)).catch(next)
      },
    }
  }
  // POST - function => post
  if (Controller.post) {
    Apis.post = {
      verb: 'post',
      url: '/',
      func: function (req, res, next) {
        if (!req.body) {
          res.status(400)
          return res.send('BAD_REQUEST')
        }
        Controller.post(req.body).then((data) => {
          return res.send(data)
        }).catch(next)
      },
    }
  }
  // PUT - function => put
  if (Controller.put) {
    Apis.put = {
      verb: 'put',
      url: '/:id',
      func: function (req, res, next) {
        if (!req.body) {
          res.status(400)
          return res.send('BAD_REQUEST')
        }
        Controller.put({
          id: req.params.id,
          data: req.body,
        }).then((data) => res.send(data)).catch(next)
      },
    }
  }
  // Delete - function => delete
  if (Controller.delete) {
    Apis.delete = {
      verb: 'delete',
      url: '/:id',
      func: function (req, res, next) {
        Controller.delete(req.params.id).then((data) => res.send(data)).catch(next)
      },
    }
  }
  return Apis
}

export default bindAPI
