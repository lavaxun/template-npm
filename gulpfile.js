'use strict'

// https://github.com/jsdoc3/jsdoc
// http://clenemt.github.io/docdash/documents_model.html#.every

var path = require('path')
var glob = require('glob')
var gulp = require('gulp')
var _ = require('lodash')
var plugins = require('gulp-load-plugins')()
var runSequence = require('run-sequence')

var changedTestFiles = []
var testAssets = {}
var defaultAssets = {}
var mergedConfig = {}

gulp.task('load:config', function () {
  testAssets = require('./config/assets/test')
  defaultAssets = require('./config/assets/default')
  mergedConfig = require('./config/default')
  console.log(mergedConfig ? 'loaded config in gulp' : 'not loaded config in gulp')
})

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test'
})

gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development'
})

// ESLint JS linting task
gulp.task('eslint', function () {
  var assets = _.union(
    defaultAssets.module.gulpConfig,
    defaultAssets.module.allJS,
    testAssets.tests.module
  )

  return gulp.src(assets)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
})

// prepare mocha code coverage
gulp.task('prepare-mocha', function (done) {
  return gulp.src(defaultAssets.module.testSubjectJS)
    .pipe(plugins.istanbul())
    .pipe(plugins.istanbul.hookRequire())
})

// Mocha tests task
gulp.task('mocha', ['prepare-mocha'], function (done) {
  var testSuites = testAssets.tests.module

  console.log('run test on files')
  console.log(testSuites)

  var istanbulOpts = {
    dir: './docs/test_coverage',
    reporters: ['lcov', 'text', 'text-summary']
  }

  gulp.src(testSuites)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: 10000
    }))
    .on('error', function () {
      console.log('Failed mocha test!')
      process.exit(1)
    })
    .on('end', function () {
      done()
    })
    .pipe(plugins.istanbul.writeReports(istanbulOpts))
})

// For bdd
gulp.task('mocha:live', function (done) {
  var testSuites = changedTestFiles.length ? changedTestFiles : testAssets.tests.module
  gulp.src(testSuites)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: 3000
    }))
    .on('error', function () {
      console.log('Failed mocha test!')
    })
    .on('end', function () {
      done()
    })
})

gulp.task('watch:test', function () {
  gulp.watch([testAssets.tests.module, defaultAssets.module.allJS], ['mocha:live'])
    .on('change', function (file) {
      changedTestFiles = []

      // iterate through module test glob patterns
      _.forEach(testAssets.tests.module, function (pattern) {
        // determine if the changed (watched) file is a module test
        _.forEach(glob.sync(pattern), function (f) {
          var filePath = path.resolve(f)

          if (filePath === path.resolve(file.path)) {
            changedTestFiles.push(f)
          }
        })
      })
    })
})

// external interface
gulp.task('dev:test', function (done) {
  runSequence('env:dev', 'load:config', ['eslint'], 'mocha', done)
})

gulp.task('test:once', function (done) {
  runSequence('env:test', 'load:config', ['eslint'], 'mocha', done)
})

gulp.task('bdd', function (done) {
  runSequence('env:test', 'load:config', ['mocha:live'], 'watch:test', done)
})
