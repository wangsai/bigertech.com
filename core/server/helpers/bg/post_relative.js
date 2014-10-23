/**
 * Created by liuxing on 14-10-22.
 */
var api             = require('../../api'),
    template        = require('../template');
var post_relative = function (options) {
    var option = (options || {}).hash || {};
    var data = {
        title : this.title,
        post_type  : this.post_type,
        limit : parseInt(option.limit)+1

    };
    return api.posts.findRelate(data).then(function(posts){
        return template.execute('relative_post', posts);
    });

};
module.exports = post_relative;