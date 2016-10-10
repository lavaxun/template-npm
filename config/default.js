'use strict'

var _ = require('lodash')
var glob = require('glob')

var getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp(/^(?:[a-z]+:)?\/\//, 'i')

  // The output array
  var output = []

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes))
    })
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns)
    } else {
      var files = glob.sync(globPatterns)
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '')
              }
            }
          } else {
            file = file.replace(excludes, '')
          }
          return file
        })
      }
      output = _.union(output, files)
    }
  }

  return output
}

var validateEnvironmentVariable = function () {
  var environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js')
  if (!environmentFiles.length) {
    process.env.NODE_ENV = 'development'
  }
}

var initGlobalConfigFiles = function (config, assets) {
  // Appending files
  config.files = {
    module: {}
  }

  config.files.module = getGlobbedPaths(assets.module.allJS)
}

var initGlobalConfig = function () {
  // Validate NODE_ENV existence
  validateEnvironmentVariable()

  var defaultAssets = require('./assets/default')
  var environmentAssets = require('./assets/' + process.env.NODE_ENV) || {}
  var assets = _.merge(defaultAssets, environmentAssets)

  // Get the default config
  var defaultConfig = require('./env/default')
  var environmentConfig = {}
  var localDefaultConfig = {}
  try {
    environmentConfig = require('./env/' + process.env.NODE_ENV) || {}
  } catch (e) {
    //
  }
  try {
    localDefaultConfig = require('./env/' + 'local/default') || {}
  } catch (e) {
    //
  }

  var config = _.merge(defaultConfig, environmentConfig, localDefaultConfig)
  // Initialize global globbed files
  initGlobalConfigFiles(config, assets)

  // Expose configuration utilities
  config.utils = {
    getGlobbedPaths: getGlobbedPaths
  }

  return config
}

module.exports = initGlobalConfig()
