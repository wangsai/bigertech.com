/**
 * Created by liuxing on 14-10-31.
 */
var request = require('request');
request.get('http://bigertech.res.meizu.com/blog/static/dist/fonts/icomoon.ttf',function(err,res,body){
   console.log(res.headers);
});