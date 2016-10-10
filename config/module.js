'use strict'

module.exports.load = function (externalConfig) {
  return require('./../src/module')(externalConfig)
}
