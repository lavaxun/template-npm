'use strict'

var module = require('./module')

module.exports.initialize = function () {
  // run initialization code here, if any

  return function (config) {
    return module.load(config)
  }
}
