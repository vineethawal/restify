require('babel-register')
require('babel-polyfill')

global.__DEV__ = process.env.NODE_ENV === 'development'
global.__PROD__ = process.env.NODE_ENV === 'production'
global.__TEST__ = process.env.NODE_ENV === 'test'
global.__RESOURCES__ = []

if (process.env.RESOURCES && process.env.RESOURCES.split(',').length) {
  __RESOURCES__ = process.env.RESOURCES.split(',').map((resource) => (resource.trim()))
}

if (__DEV__) {
  require('dotenv').config()
}

const app = require('./server/index.js')

module.exports = app
