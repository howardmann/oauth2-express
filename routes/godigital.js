let path = require('path')
require('dotenv').config({ path: path.join(__dirname, '/./../.env') })

let godigital = module.exports = {}

let AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
s3 = new AWS.S3();

const myBucket = 'godigitaltest';

godigital.fetchAll = (req, res, next) => {
  s3.listObjects({ Bucket: myBucket }).promise()
    .then(data => {
      res.render('all', { data: data.Contents });
    })
    .catch(err => console.log(err));
}

godigital.fetchSingle = (req, res, next) => {
  let params = { Bucket: myBucket, Key: req.params.filename };
  let url = s3.getSignedUrl('getObject', params);
  if (url) {
    res.redirect(url)  
  } else {
    next()
  }  
}