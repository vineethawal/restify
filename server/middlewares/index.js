import morgan from 'morgan'
import bodyParser from 'body-parser'

function initMiddleware (app) {
  if (!__TEST__) {
    app.use(morgan('dev'))
  }

  // Parsing middlewares
  // parse application/json
  app.use(bodyParser.json())
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
}

export default initMiddleware
