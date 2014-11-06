/**
 * Created by liuxing on 14-10-22.
 */
var hbs             = require('express-hbs');


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
    addblank: addblank,
    getCDNImage: require('../../utils/bigertech').getCdnImageUrl
}