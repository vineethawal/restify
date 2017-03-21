const _fields = {
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  deleteFlag: {
    type: Boolean,
    default: false,
  },
}

const _model = (Model) => {
  Model.get = (id) => {
    return new Promise(function (resolve, reject) {
      Model.findById(id, (err, document) => {
        /* istanbul ignore if */
        if (err) {
          return reject(new Error(JSON.stringify(err)))
        }
        resolve(document)
      })
    })
  }

  Model.post = (data = {}) => {
    return new Promise((resolve, reject) => {
      data.createdDate = Date.now()
      const document = new Model(data)
      document.save((err, created) => {
        /* istanbul ignore if */
        if (err) {
          return reject(new Error(JSON.stringify(err)))
        }
        resolve(created)
      })
    })
  }

  Model.put = ({id, data = {}} = {}) => {
    return new Promise((resolve, reject) => {
      Model.update({_id: id},
        data,
        (err, res) => {
          /* istanbul ignore if */
          if (err) {
            return reject(new Error(JSON.stringify(err)))
          }
          Model.findById(id, (err, document) => {
            /* istanbul ignore if */
            if (err) {
              return reject(new Error(JSON.stringify(err)))
            }
            return resolve(document)
          })
        })
    })
  }

  Model.delete = (id) => {
    return new Promise((resolve, reject) => {
      Model.findById(id,
      (err, document) => {
        /* istanbul ignore if */
        if (err || !document) {
          return reject(new Error(JSON.stringify(err)))
        }
        document.deleteFlag = true
        document.save((err, updated) => {
          /* istanbul ignore if */
          if (err) {
            return reject(new Error(JSON.stringify(err)))
          }
          resolve({success: updated.deleteFlag})
        })
      })
    })
  }

  Model.search = ({query = {}, sort = {}, limit = null, select = {}} = {}) => {
    return new Promise(function (resolve, reject) {
      Model
        .find(query)
        .select(select)
        .sort(sort)
        .limit(limit)
        .exec(function (err, documents) {
          /* istanbul ignore if */
          if (err) {
            return reject(new Error(JSON.stringify(err)))
          }
          resolve(documents)
        })
    })
  }
}
export {
  _fields,
  _model,
}
