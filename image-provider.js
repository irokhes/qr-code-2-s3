var config = require('./config.js');
var promise = require('bluebird');
var AWS = require('aws-sdk');

var AWS_ACCESS_KEY = config.s3amazon.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = config.s3amazon.AWS_SECRET_KEY;
var S3_BUCKET = config.s3amazon.S3_BUCKET_NAME;

exports.saveImage = function(name, file, extension){
    var fileName = name + '_' + new Date().getTime() + '.' + extension;
    return new promise(function(resolve, reject) {
      
        // For dev purposes only
        AWS.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY });

        var params = { Bucket: S3_BUCKET, Key: fileName, Body: file};
        var s3 = new AWS.S3({signatureVersion: 'v4'});
        
        s3.upload(params,function(err, data){
          if(err) reject(err);
          resolve({url:config.s3amazon.URL + fileName});
        });
    });   
} 

exports.deleteImage = function(image){
  return new promise(function(resolve, reject){
      AWS.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY });
      var params = {Bucket: S3_BUCKET, Key: image};
      var s3 = new AWS.S3();
      s3.deleteObject(params, function(err, data) {
        if(err) reject(err);
        resolve({result:'success'});          
      });
  });
}