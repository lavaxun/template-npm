'use strict'

var _ = require('lodash')
var config = require('./../config/default')

var exporting = {}
exporting.read = function () {
  return 'read book'
}

exporting.write = function (title, callback) {
  callback('write "' + title + '"')
}

exporting.testConfig = function (optionChildKey) {
  return config.s3Options[optionChildKey]
}

module.exports = function (externalConfig) {
  if (_.isObject(externalConfig)) { // has external config
    config = _.merge(config, externalConfig)
  }

  return exporting
}
