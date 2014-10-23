/**
 * Created by liuxing on 14-10-22.
 */
var hbs             = require('express-hbs');
//输出文章的简介
var post_desc = function () {
    var desc = this.meta_description ? this.meta_description : '';
    return  new hbs.handlebars.SafeString(desc);
};
module.exports = post_desc;