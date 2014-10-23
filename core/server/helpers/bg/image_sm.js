/**
 * Created by liuxing on 14-10-22.
 */
var defaultBgImg    = '/content/images/def-bg.jpg',
    util            = require('./util'),
    config          = require('../../config');
function image_sm() {
    if (!this.image) {
        this.image = defaultBgImg;
    }
    // 得到裁剪过后的图片
    if (config.images.dir) {
        var image_url = this.image;
        var last_slug = image_url.lastIndexOf('\/');
        this.image = image_url.substr(0,last_slug)+'/'+config.images.dir+image_url.substr(last_slug,image_url.length);
    }
    return util.getProductImage(this.image);
};
module.exports = image_sm;