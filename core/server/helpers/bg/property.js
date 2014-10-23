/**
 * Created by liuxing on 14-10-22.
 */
var hbs             = require('express-hbs');

var title = function () {
    return  new hbs.handlebars.SafeString(hbs.handlebars.Utils.escapeExpression(this.title || ''));
};
var uuid = function () {
    return  new hbs.handlebars.SafeString(this.uuid);
};
var slug = function () {
    return  new hbs.handlebars.SafeString(this.slug);
};
module.exports = {
    title:title,
    uuid:uuid,
    slug:slug,
}