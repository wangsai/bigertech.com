/**
 * Created by liuxing on 14-10-22.
 */
var coverImg        = '/content/images/def-author.jpg',
    util            = require('./util');
var author_cover = function(){
    if(this.cover){
        coverImg = this.cover;
    }
    return util.getProductImage(coverImg);
}