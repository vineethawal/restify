import apisRouter from './apis'

function initRouter (app) {
  // Bind routers
  app.use('/data/', apisRouter)

  // 404
  app.use((req, res, next) => {
    res.status(404)
    res.send('NOT_FOUND')
  })
}

export default initRouter
