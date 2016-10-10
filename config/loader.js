'use strict'

var loadingModule = require('./module')

module.exports.initialize = function () {
  // run initialization code here, if any

  return function (config) {
    return loadingModule.load(config)
  }
}
