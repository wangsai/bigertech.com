/**
 * Created by liuxing on 14-11-3.
 */
var fs = require('fs-extra');
var path = require('path'),
    config = require('../../server/config');
var pic = '/2014/11/tim-cook.jpg';
var srcImage = path.join(config.paths.imagesPath,pic),
    destImage =  path.join(config.paths.images_sm_path,pic);

fs.copy(srcImage,destImage,function(err){
    if(err) console.error(err);
    console.log('success');
});

