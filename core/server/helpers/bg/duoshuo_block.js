/**
 * Created by liuxing on 14-10-22.
 */
var config          = require('../../config'),
    template        = require('../template');
var duoshuo_block = function () {
    var context = {
        title : this.title,
        uuid : this.uuid,
        duoshuo_url : config.url+'/'+ this.slug
    };
    return template.execute('duoshuo', context);
};
module.exports = duoshuo_block;