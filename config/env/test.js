'use strict'

// this is only loaded when running unit testing
module.exports = {
  s3Options: {
    // the following codes allow to use env vars for testing
    // accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    // secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    // region: process.env.S3_REGION || ''
  }
}
