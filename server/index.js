import http from 'http'
import express from 'express'
import _debug from 'debug'
import helmet from 'helmet'
import Raven from 'raven'

// Initialize utils
import './utils'

// Initialize models
import './models'

// Initialize controllers
import './controllers'

import initRouter from './routes'
import initMiddleware from './middlewares'

// Sentry setup
global.Raven = Raven.config(process.env.SENTRY_TOKEN, {
  release: process.env.VERSION,
  environment: process.env.SENTRY_ENVIRONMENT,
  logger: 'server',
}).install()

// Initialize connectors
import './libs/connectors'

const port = process.env.PORT || 3000

const debug = _debug('app:server')
const app = express()

app.use(Raven.requestHandler())

app.use(helmet())

initMiddleware(app)

initRouter(app)

app.use(Raven.errorHandler())

const server = http.createServer(app)

server.listen(port)
debug(`Server is now running on port ${port}.`)

export default app
