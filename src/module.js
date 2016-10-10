'use strict'

var _ = require('lodash')
var config = require('./../config/default')

/**
 * A module that demo usage of this project
 * @exports demo
 */
var exporting = {}

/**
 * read book
 * @function
 * @returns {string} - 'read book'
 */
exporting.read = function () {
  return 'read book'
}

/**
 * write book
 * @param {string} title - book title
 * @param {bookTitleCallback} callback - prefix the book title with 'write '
 */
exporting.write = function (title, callback) {
  callback('write "' + title + '"')
}

/**
 * Return one of the s3 config value by key
 * @param {string} optionChildKey - a key of s3Options
 *                                  must be a valid key
 * @returns {string} - corresponding value for s3 config key
 */
exporting.testConfig = function (optionChildKey) {
  return config.s3Options[optionChildKey]
}

/**
 * Inject configuration into module at runtime
 * so that there is no hard-coded configurations
 *
 * @param {object} externalConfig - configuration object
 * @return {object}
 */
module.exports = function (externalConfig) {
  if (_.isObject(externalConfig)) { // has external config
    config = _.merge(config, externalConfig)
  }

  return exporting
}

/**
 * Callback using book title
 * @callback bookTitleCallback
 * @param {string} bookTitle - book title
 */
