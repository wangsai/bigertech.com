// # Local File System Image Storage module
// The (default) module for storing images, using the local file system

var express   = require('express'),
    fs        = require('fs-extra'),
    path      = require('path'),
    util      = require('util'),
    Promise   = require('bluebird'),
    errors    = require('../errors'),
    config    = require('../config'),
    utils     = require('../utils'),
    baseStore = require('./base'),
    images  = require('images');
config.images = config.bgConfig.images_sm;   //pic cutting config
function LocalFileStore() {
}
util.inherits(LocalFileStore, baseStore);

// ### Save
// Saves the image to storage (the file system)
// - image is the express image object
// - returns a promise which ultimately returns the full url to the uploaded image
LocalFileStore.prototype.save = function (image) {
    var targetDir = this.getTargetDir(config.paths.imagesPath),
        targetFilename;

    return this.getUniqueFileName(this, image, targetDir).then(function (filename) {
        targetFilename = filename;
        return Promise.promisify(fs.mkdirs)(targetDir);
    }).then(function () {
        return Promise.promisify(fs.copy)(image.path, targetFilename);
    }).then(function () {
        // The src for the image must be in URI format, not a file system path, which in Windows uses \
        // For local file system storage can use relative path so add a slash
        var fullUrl = (config.paths.subdir + '/' + config.paths.imagesRelPath + '/' +
            path.relative(config.paths.imagesPath, targetFilename)).replace(new RegExp('\\' + path.sep, 'g'), '/');
        return fullUrl;
    }).catch(function (e) {
        errors.logError(e);
        return Promise.reject(e);
    });
};

LocalFileStore.prototype.exists = function (filename) {
    return new Promise(function (resolve) {
        fs.exists(filename, function (exists) {
            resolve(exists);
        });
    });
};

// middleware for serving the files
LocalFileStore.prototype.serve = function () {
    // For some reason send divides the max age number by 1000
    return express['static'](config.paths.imagesPath, {maxAge: utils.ONE_YEAR_MS});
};
//add by liuxing  add cutting image
LocalFileStore.prototype.cuttingimage = function imageCutting(targetFilename) {
    var originFile = targetFilename.replace('/images/','/images_sm/');
    return new Promise(function (resolve) {
        targetFilename  = path.join(config.paths.appRoot,targetFilename);
        var targetThumb = targetFilename.replace('/images/','/images_sm/');
        var ext = path.extname(targetFilename);
        if(ext == '.gif'){     //if gif , copy it
            fs.copy(targetFilename,targetThumb,function(err){
                resolve(originFile);
            });
        }else{
            var img = images(targetFilename);
            var size = img.size();
            var srcWidth = size.width;
            var srcHeight = size.height;
            var scale = config.images.scale;
            var cutWidth,cutHeight;
            if(srcHeight/srcWidth < scale ){
                cutHeight = srcHeight;
                cutWidth = srcHeight / scale;
                x = (srcWidth - cutWidth) / 2;
                y = 0;
            }else{
                cutWidth = srcWidth;
                cutHeight = srcWidth * scale;
                y = (srcHeight - cutHeight) / 2;
                x = 0;
            }
            img = images(img, x, y, cutWidth, cutHeight);  //按比例裁剪
            size = img.size(config.images.targetWidth);    //等比缩放
            srcWidth = size.width;
            srcHeight = size.height;

            var targetWidth = config.images.targetWidth || srcWidth;
            var targetHeight = config.images.targetWidth * config.images.scale || srcHeight;


            if (srcWidth < targetWidth || targetWidth <= 0) {
                targetWidth = srcWidth;
            }
            if (srcHeight < targetHeight  || targetHeight <= 0) {
                targetHeight = srcHeight;
            }

            var x = 0;
            var y = 0;
            if (targetWidth !== x || targetHeight !== y) {
                // 选取图片的居中位置坐标
                x = (srcWidth - targetWidth) / 2;
                y = (srcHeight - targetHeight) / 2;
            }
            console.log('cutting : '+targetThumb);
            images(img, x, y, targetWidth, targetHeight).save(targetThumb);
            resolve(originFile);
        }
    });
};

LocalFileStore.prototype.copyToCDN = function(imagePath){
    var srcImage = path.join(config.paths.appRoot,imagePath);
    imagePath = imagePath.replace('/content/','');
    destImage =  path.join(config.paths.images_copy_path,imagePath);
    console.log('copy : %s --> %s',srcImage,destImage);
    return Promise.promisify(fs.copy)(srcImage, destImage);
};
//end add

module.exports = LocalFileStore;
