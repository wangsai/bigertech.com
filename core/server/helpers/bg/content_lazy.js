/**
 * Created by liuxing on 14-10-22.
 */
var hbs             = require('express-hbs'),
    bgutil            = require('../../utils/bigertech'),
    util            = require('./util'),
    cheerio         = require('cheerio'),
    config          = require('../../config'),
    _               = require('lodash');
var isProduction       = config.bgConfig.cdn;
var contentLazy = function () {
    // 正文图片延迟加载
    var $ = cheerio.load(this.html);
    var imgs = $("img");
    imgs.each(function(i,e){
        $(e).addClass("lazy");
        var src = $(this).attr('src');
        if(isProduction && src.indexOf(config.paths.contentPath)){
            $(this).attr('data-original', bgutil.getCdnImageUrl(src));
        } else{
            $(e).attr("data-original",$(e).attr("src"));
        }
        $(e).removeAttr("src");
    });
    this.html = util.addblank($.html());  //加空格和 「」
    return new hbs.handlebars.SafeString(this.html);
};
module.exports = contentLazy;