/**
 * Created by liuxing on 14-10-22.
 */
var typeLinks   = [],
    typeNames   = [],
    api         = require('../api'),
    config          = require('../config'),
    _           =   require('lodash');

function initLinks(){
    return api.postType.browse().then(function(result){
        if(result.postTypes){
            _.forEach(result.postTypes,function(item){
                typeLinks.push(item.slug);
                typeNames.push(item.name);
            });
        }
        return;
    });
}
function getCdnImageUrl(image) {
    if(config.bgConfig.cdn.isProduction) {
        var pos = image.indexOf('images/');
        if (pos !== -1) {
            var imgPath = image.substr(pos + 'images/'.length);
            image = config.bgConfig.cdn.dynamicAssetsUrl;
            if (config.bgConfig.cdn.dynamicAssetsUrl && config.bgConfig.cdn.dynamicAssetsUrl.substr(-1) !== '/') {
                image += '/';
            }

            image += imgPath;
        }

        return image;
    }
    return image;
}
module.exports = {
    typeLinks : typeLinks,
    initLinks : initLinks,
    typeNames : typeNames,
    getCdnImageUrl : getCdnImageUrl
}