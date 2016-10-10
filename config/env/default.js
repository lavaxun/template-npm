'use strict'

// this will be loaded all the time
module.exports = {
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    region: process.env.S3_REGION || 'ap-southeast-1'
  }
}
