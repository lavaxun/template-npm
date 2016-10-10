'use strict'

var bookIniitalizer = require('./../src/module')
var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect
chai.use(require('sinon-chai'))

describe('Test Book', function () {
  var book = bookIniitalizer({
    s3Options: {
      accessKeyId: 'hello world',
      newKey: 'new value'
    }
  })  // pass in external config

  it('should be read by someone', function (done) {
    expect(book.read()).to.equal('read book')
    done()
  })

  it('should be read by me and somebody')

  it('should be writing book title', function (done) {
    var cb = sinon.spy()
    book.write('Zero to one', cb)
    expect(cb).to.have.been.calledWith('write "Zero to one"')
    done()
  })

  it('should be merging external config', function (done) {
    expect(book.testConfig('accessKeyId')).to.equal('hello world')
    expect(book.testConfig('newKey')).to.equal('new value')
    expect(book.testConfig('region')).to.equal('ap-southeast-1')
    done()
  })
})
