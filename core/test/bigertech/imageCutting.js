process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../../server/config');
var images  = require('images');
var path    = require('path');
var _       = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');
var util = require("util");
var stream = require('stream'),
    fs = require('fs-extra');

config.images = config.bgConfig.images_sm;

var dirname = path.join(config.paths.imagesPath,'/2014/11/node-5m.gif');


/**
 * 剪辑图片
 * @param  {String} targetFilename 需要被剪辑的图片
 * @param  {String} targetThumb    裁剪后图片的存放位置
 * @return
 */
function imageCutting(targetFilename) {
    var cutFilePath = targetFilename.replace('/images/','/images_sm/');
    return new Promise(function (resolve) {
        var targetThumb = targetFilename.replace('/images/','/images_sm/');
        var ext = path.extname(targetFilename);
        if(ext == '.gif'){     //if gif , copy it
            fs.copy(targetFilename,targetThumb,function(err){
                resolve(cutFilePath);
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
            resolve(cutFilePath);
        }
    });
}
imageCutting(dirname).then(function(data){
    console.log(data);
});