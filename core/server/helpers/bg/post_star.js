/**
 * Created by liuxing on 14-10-22.
 */
var hbs             = require('express-hbs');
var post_star = function () {
    var star = this.duoshuo ? this.duoshuo.comments:0;
    return  new hbs.handlebars.SafeString(star);
};
module.exports = post_star;