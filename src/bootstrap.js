require('babel-polyfill')
global.Promise = require('bluebird')
Promise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: false,
  monitoring: false,
})
require('source-map-support').install()
require('./server')
