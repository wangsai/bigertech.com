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
    if (bgConfig.images_sm.dir) {
        this.image = this.image.replace(bgConfig.default_image_path,bgConfig.images_sm_path);
    }
    return this.image;
};
module.exports = image_sm;