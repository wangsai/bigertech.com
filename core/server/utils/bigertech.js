/**
 * Created by liuxing on 14-10-22.
 */
var typeLinks   = [],
    typeNames   = [],
    api         = require('../api'),
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
module.exports = {
    typeLinks : typeLinks,
    initLinks : initLinks,
    typeNames : typeNames
}