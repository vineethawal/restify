import mongoose from 'mongoose'
import _debug from 'debug'

const debug = _debug('app:connection:mongo')

mongoose.connect(
  `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
)

mongoose.connection.on('connected', function () {
  debug(
    `Connected to MongoDB: ${process.env.MONGO_SERVER}:${process.env.MONGO_PORT} DB: ${process.env.MONGO_DB}.`
  )
})

/* istanbul ignore next */
mongoose.connection.on('error', function (err) {
  logger(new Error(err.message))
  debug(
    `Error in connecting MongoDB: ${process.env.MONGO_SERVER}:${process.env.MONGO_PORT} DB: ${process.env.MONGO_DB}.`,
    err)
})

export default {
  mongoose,
}
