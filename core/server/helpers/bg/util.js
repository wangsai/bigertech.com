/**
 * Created by liuxing on 14-10-22.
 */
var config          = require('../../config');
var hbs             = require('express-hbs');
function getProductImage(img){
    if (config.cdn.isProduction) {
        img = getCdnImageUrl(img);
    }
    return  new hbs.handlebars.SafeString(img);
}
function getCdnImageUrl(image) {
    var pos = image.indexOf('images/');
    if (pos !== -1) {
        var imgPath = image.substr(pos + 'images/'.length);
        image = config.cdn.dynamicAssetsUrl;
        if (config.cdn.dynamicAssetsUrl && config.cdn.dynamicAssetsUrl.substr(-1) !== '/') {
            image += '/';
        }

        image += imgPath;
    }

    return image;
}
var addblank =function(inText){
    return inText.replace(/([\u4E00-\u9FA3])([A-Za-z0-9\(\[\{@#])/g,'$1 $2')
        .replace(/([A-Za-z0-9\.,!@#%?\)\]\}])([\u4E00-\u9FA3])/g,'$1 $2')
        .replace(/([〔〕（）。，！？《》—“”「」]) +/g,'$1')
        .replace(/ +([〔〕（）。，！？《》—“”「」])/g,'$1')
        .replace(/ +/g,' ')
        .replace(/“/g,"「")
        .replace(/”/g,"」")
        .replace(/‘/g,"『")
        .replace(/’/g,"』");
}
module.exports = {
    getProductImage:getProductImage,
    addblank:addblank
}