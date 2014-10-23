// ### Pagination Helper
// `{{pagination}}`
// Outputs previous and next buttons, along with info about the current page

var _               = require('lodash'),
    errors          = require('../errors'),
    template        = require('./template'),
    pagination;

pagination = function (options) {
        /*jshint unused:false*/
        if (!_.isObject(this.pagination) || _.isFunction(this.pagination)) {
            return errors.logAndThrowError('pagination data is not an object or is a function');
        }

        if (_.isUndefined(this.pagination.page) || _.isUndefined(this.pagination.pages) ||
            _.isUndefined(this.pagination.total) || _.isUndefined(this.pagination.limit)) {
            return errors.logAndThrowError('All values must be defined for page, pages, limit and total');
        }

        if ((!_.isNull(this.pagination.next) && !_.isNumber(this.pagination.next)) ||
            (!_.isNull(this.pagination.prev) && !_.isNumber(this.pagination.prev))) {
            return errors.logAndThrowError('Invalid value, Next/Prev must be a number');
        }

        if (!_.isNumber(this.pagination.page) || !_.isNumber(this.pagination.pages) ||
            !_.isNumber(this.pagination.total) || !_.isNumber(this.pagination.limit)) {
            return errors.logAndThrowError('Invalid value, check page, pages, limit and total are numbers');
        }
        var slug = '/category/'+this.posts[0].post_type.slug;
        /* 显示页数 liuxing */
        if(options.hash.type == 'page'){  //不是默认主页（各种类型混合），则使用文章的类型（文章、视频、等等）
            slug = '';
        }

        if (this.tag !== undefined) {   //tag 分页
            slug = '/tag/' + this.tag.slug;
        }
        if (this.author !== undefined) {  //作者信息分页
            slug = '/author/' + this.author.slug;
        }

        this.pagination.post_type = slug;
        var pagesItem =  '';
        var result = getPagination(this.pagination.pages,this.pagination.page);
        for(var i = 0 ;i < result.length;i++){
            //省略号
            if(result[i] == '...'){
                pagesItem += "<span class='page omit'>"+result[i]+"</span>";
                continue;
            }
            if(result[i] == this.pagination.page){
                pagesItem +=  "<span class='page current'>"+result[i]+"</span>";
            }else{
                pagesItem += "<a href="+ slug +"/page/"+ result[i] +" class='page-num'><span class='page'>"+result[i]+"</span></a>";
            }
        }

        this.pagination.pageArray = pagesItem;
        /*end  显示页数 */
        var context = _.merge({}, this.pagination);

        if (this.tag !== undefined) {
            context.tagSlug = this.tag.slug;
        }

        if (this.author !== undefined) {
            context.authorSlug = this.author.slug;
        }

        return template.execute('pagination', context);
    };
    function getPagination(pageNum,current){
        if(pageNum < current)
            return 'error';

        var pageArray = [];
        //小于 5 页
        if(pageNum <= 5){
            for(var i = 1;i <= pageNum ;i++){
                pageArray.push(i);
            }
            return pageArray;
        }
        //大于5页
        //当前页小3

        if(current <= 3){
            for(var i = 1;i <= 5 ;i++){
                pageArray.push(i);
            }
            pageArray.push('...');
            pageArray.push(pageNum); //尾页
            return pageArray;
        }
        pageArray.push(1);      //首页
        //当前页大于 pageNum-3      ... ,3 ,4 ,5 ,6, 7
        if( current >= pageNum-3 ){
            pageArray.push('...');
            for(var i = pageNum-4;i <= pageNum ;i++){
                pageArray.push(i);
            }
            return pageArray;
        }
        if(current  > 4){
            pageArray.push('...');
        }
        //其他情况

        pageArray.push(current - 2);
        pageArray.push(current - 1);
        pageArray.push(current );
        pageArray.push(current + 1);
        pageArray.push(current + 2);
        if(current  < pageNum-1 ){
            pageArray.push('...');
        }
        pageArray.push(pageNum); //尾页

        return pageArray;
    }

module.exports = pagination;
