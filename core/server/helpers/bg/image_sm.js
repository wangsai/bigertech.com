/**
 * Created by liuxing on 14-10-22.
 */
var defaultBgImg    = '/content/images/def-bg.jpg',
    util            = require('./util'),
    config          = require('../../config'),
    bgConfig        = config.bgConfig;

function image_sm() {
    if (!this.image) {
        this.image = defaultBgImg;
    }
    // 得到裁剪过后的图片
    this.image = this.image.replace(bgConfig.default_image_path,bgConfig.images_sm_path);

    return util.getCDNImage(this.image);
};
module.exports = image_sm;