/**
 * Created by liuxing on 14-11-3.
 */
/**保存笔戈新增的配置
 * 1.  图片裁剪成指定尺寸，等比例裁剪
 * 2.  长微博功能
 */

var path = require('path');
var config ={
    default_image_path :'/images/',
    images_sm_path :'/images/images_sm/',
    images_copy_path: '/data/static/images/',
    cdn: {
        isProduction: true,
        staticAssetsUrl: 'http://127.0.0.1:8001/assets/',
        dynamicAssetsUrl: 'http://127.0.0.1:8001/content/images/',
    },
    images_sm: {
        // 如果下面几项留空，则说明上传的图片无需截图
        targetWidth: 350,
        targetHeight: 210,
        scale: 0.6
    },
    changweibo: {
        url: 'http://www.bigertech.com',
        dir: 'weibo'
    }
};
// Export config
module.exports = config;