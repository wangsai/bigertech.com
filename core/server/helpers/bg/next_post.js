/**
 * Created by liuxing on 14-10-22.
 */
var api             = require('../../api'),
    template        = require('../template');
var next_post = function (options) {
    var options = (options || {}).hash ||{};
    var options =  {
        include :'author',
        limit : options.limit ? options.limit:1,
        post_type : options.type ? parseInt(options.type):0
    };
    return api.posts.nextRow(this.id,options).then(function(posts){
        return template.execute('next_post', {posts:posts});
    });
};
module.exports = next_post;