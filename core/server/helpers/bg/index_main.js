/**
 * Created by liuxing on 14-10-22.
 */
var api             = require('../../api'),
    template        = require('../template');
var index_topic = function (options) {
    var option = (options || {}).hash || {};
    // 得到指定slug专题下的所有文章
    return api.positions.getRelationsByPositionSlug(option.data, {publish: 1 }).then(function(relation) {
        if (!relation) {
            //return when.reject(new errors.NotFoundError('Topic not be found.'));
        }
        var data = {};
        if(relation && relation[0]){
            relation[0].siteUrl = relation[0].url;
            data = relation[0];
        }
        return template.execute('topic', {topic:data});
    })
};
module.exports = index_topic;