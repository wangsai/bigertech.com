/**
 * Created by liuxing on 14-10-22.
 */
 var Promise = require('bluebird'),
    cheerio         = require('cheerio');
var video_play_count = function () {
    var  $       = cheerio.load(this.html),
        video_id;

    video_id = $("youkuid").text();
    var data = {
        url: youkuUrl,
        qs: {
            client_id: '2cf898d1c36ea115',
            video_id : video_id,
            ext: 'view_count,up_count'
        }
    };
    return new Promise(function (resolve, reject) {
        if (video_id && video_id !== '') {

            request(data, function (err, data) {
                if (err) {
                    console.error(err);
                }
                var youku = JSON.parse(data.body);
                var view_count = youku.view_count ? youku.view_count : 0;  //播放次数
                return resolve(new hbs.handlebars.SafeString(view_count));
            });
        } else {
            return resolve(new hbs.handlebars.SafeString(0));
        }
    });
};
module.exports = video_play_count;
/*
 * 响应数据
 * { id: 'XNzI1NDU4ODI0',
 title: '2004年习近平主席专访：我是延安人[@新全民开讲]',
 link: 'http://v.youku.com/v_show/id_XNzI1NDU4ODI0.html',
 thumbnail: 'http://g4.ykimg.com/0100641F4653999B6EA8E704006A33D013864B-A787-0A64-FF2F-11F85065B398',
 bigThumbnail: 'http://g4.ykimg.com/1100641F4653999B6EA8E704006A33D013864B-A787-0A64-FF2F-11F85065B398',
 duration: '1677.13',
 category: '资讯',
 state: 'normal',
 created: '2014-06-12 20:04:33',
 published: '2014-06-12 20:59:33',
 description: '2004年习近平主席专访：我是延安人[@新全民开讲]',
 player: 'http://player.youku.com/player.php/sid/XNzI1NDU4ODI0/v.swf',
 public_type: 'all',
 copyright_type: 'reproduced',
 user:
 { id: '67136051',
 name: '新全民开讲',
 link: 'http://v.youku.com/user_show/id_UMjY4NTQ0MjA0html' },
 tags: '2004年,习近平主席,专访,我是延安人,新全民开讲',
 view_count: 3110970,
 favorite_count: '19',
 comment_count: '4790',
 up_count: '34353',
 down_count: '1012',
 operation_limit: [],
 streamtypes: [ 'flvhd', '3gphd' ],
 source:
 { id: '10020',
 name: '优酷PC客户端',
 link: 'http://c.youku.com/pc-client' } }

 * */