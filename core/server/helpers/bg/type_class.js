/**
 * Created by liuxing on 14-10-22.
 */
var hbs             = require('express-hbs');
var type_class = function () {
    return  new hbs.handlebars.SafeString('type-'+this.post_type.slug);
};
module.exports = type_class;