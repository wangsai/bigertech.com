var hbs             = require('express-hbs'),
    _               = require('lodash'),
    Promise         = require('bluebird'),

    config          = require('../config'),
    errors          = require('../errors'),

    utils           = require('./utils'),

    coreHelpers     = {},
    registerHelpers;

// Pre-load settings data:
// - activeTheme
// - permalinks

if (!utils.isProduction) {
    hbs.handlebars.logger.level = 0;
}

coreHelpers.asset  = require('./asset');
coreHelpers.author  = require('./author');
coreHelpers.body_class  = require('./body_class');
coreHelpers.content  = require('./content');
coreHelpers.date  = require('./date');
coreHelpers.encode  = require('./encode');
coreHelpers.excerpt  = require('./excerpt');
coreHelpers.foreach = require('./foreach');
coreHelpers.ghost_foot = require('./ghost_foot');
coreHelpers.ghost_head = require('./ghost_head');
coreHelpers.is = require('./is');
coreHelpers.has = require('./has');
coreHelpers.meta_description = require('./meta_description');
coreHelpers.meta_title = require('./meta_title');
coreHelpers.page_url = require('./page_url');
coreHelpers.pageUrl = require('./page_url').deprecated;
coreHelpers.pagination = require('./pagination');
coreHelpers.plural = require('./plural');
coreHelpers.post_class = require('./post_class');
coreHelpers.tags = require('./tags');
coreHelpers.title = require('./title');
coreHelpers.url = require('./url');

coreHelpers.ghost_script_tags = require('./ghost_script_tags');
//add by liuxing
coreHelpers.video_play_count = require('./bg/video_play_count');
coreHelpers.post_relative = require('./bg/post_relative');
coreHelpers.index_topic = require('./bg/index_topic');
coreHelpers.index_main = require('./bg/index_main');
coreHelpers.next_post = require('./bg/next_post');
coreHelpers.pre_post = require('./bg/pre_post');
coreHelpers.content_no_lazy = require('./bg/content_no_lazy');
coreHelpers.uuid = require('./bg/property').uuid;
coreHelpers.slug = require('./bg/property').slug;
coreHelpers.image = require('./bg/property').image;
coreHelpers.image_sm = require('./bg/image_sm');
coreHelpers.type_class = require('./bg/type_class');
coreHelpers.post_star = require('./bg/post_star');
coreHelpers.post_desc = require('./bg/post_desc');
coreHelpers.duoshuo_block = require('./bg/duoshuo_block');
coreHelpers.author_cover = require('./bg/author_cover');
coreHelpers.content_lazy = require('./bg/content_lazy');
//end add

// ### Filestorage helper
//
// *Usage example:*
// `{{file_storage}}`
//
// Returns the config value for fileStorage.
coreHelpers.file_storage = function (context, options) {
    /*jshint unused:false*/
    if (config.hasOwnProperty('fileStorage')) {
        return _.isObject(config.fileStorage) ? 'true' : config.fileStorage.toString();
    }
    return 'true';
};

// ### Apps helper
//
// *Usage example:*
// `{{apps}}`
//
// Returns the config value for apps.
coreHelpers.apps = function (context, options) {
    /*jshint unused:false*/
    if (config.hasOwnProperty('apps')) {
        return config.apps.toString();
    }
    return 'false';
};

// ### Blog Url helper
//
// *Usage example:*
// `{{blog_url}}`
//
// Returns the config value for url.
coreHelpers.blog_url = function (context, options) {
    /*jshint unused:false*/
    return config.theme.url.toString();
};

coreHelpers.helperMissing = function (arg) {
    if (arguments.length === 2) {
        return undefined;
    }
    errors.logError('Missing helper: "' + arg + '"');
};

// Register an async handlebars helper for a given handlebars instance
function registerAsyncHelper(hbs, name, fn) {
    hbs.registerAsyncHelper(name, function (options, cb) {
        // Wrap the function passed in with a when.resolve so it can
        // return either a promise or a value
        Promise.resolve(fn.call(this, options)).then(function (result) {
            cb(result);
        }).catch(function (err) {
            errors.logAndThrowError(err, 'registerAsyncThemeHelper: ' + name);
        });
    });
}

// Register a handlebars helper for themes
function registerThemeHelper(name, fn) {
    hbs.registerHelper(name, fn);
}

// Register an async handlebars helper for themes
function registerAsyncThemeHelper(name, fn) {
    registerAsyncHelper(hbs, name, fn);
}

// Register a handlebars helper for admin
function registerAdminHelper(name, fn) {
    coreHelpers.adminHbs.registerHelper(name, fn);
}

registerHelpers = function (adminHbs) {
    // Expose hbs instance for admin
    coreHelpers.adminHbs = adminHbs;

    // Register theme helpers
    registerThemeHelper('asset', coreHelpers.asset);
    registerThemeHelper('author', coreHelpers.author);
    registerThemeHelper('content', coreHelpers.content);
    registerThemeHelper('title', coreHelpers.title);
    registerThemeHelper('date', coreHelpers.date);
    registerThemeHelper('encode', coreHelpers.encode);
    registerThemeHelper('excerpt', coreHelpers.excerpt);
    registerThemeHelper('foreach', coreHelpers.foreach);
    registerThemeHelper('is', coreHelpers.is);
    registerThemeHelper('has', coreHelpers.has);
    registerThemeHelper('page_url', coreHelpers.page_url);
    registerThemeHelper('pageUrl', coreHelpers.pageUrl);
    registerThemeHelper('pagination', coreHelpers.pagination);
    registerThemeHelper('tags', coreHelpers.tags);
    registerThemeHelper('plural', coreHelpers.plural);

    // Async theme helpers
    registerAsyncThemeHelper('body_class', coreHelpers.body_class);
    registerAsyncThemeHelper('ghost_foot', coreHelpers.ghost_foot);
    registerAsyncThemeHelper('ghost_head', coreHelpers.ghost_head);
    registerAsyncThemeHelper('meta_description', coreHelpers.meta_description);
    registerAsyncThemeHelper('meta_title', coreHelpers.meta_title);
    registerAsyncThemeHelper('post_class', coreHelpers.post_class);
    registerAsyncThemeHelper('url', coreHelpers.url);

    // Register admin helpers
    registerAdminHelper('ghost_script_tags', coreHelpers.ghost_script_tags);
    registerAdminHelper('asset', coreHelpers.asset);
    registerAdminHelper('apps', coreHelpers.apps);
    registerAdminHelper('file_storage', coreHelpers.file_storage);
    registerAdminHelper('blog_url', coreHelpers.blog_url);

    //add begin  by liuxing   add helper
    registerAsyncThemeHelper('video_play_count', coreHelpers.video_play_count);
    registerAsyncThemeHelper('post_relative', coreHelpers.post_relative);
    registerAsyncThemeHelper('index_topic', coreHelpers.index_topic);
    registerAsyncThemeHelper('index_main', coreHelpers.index_main);
    registerAsyncThemeHelper('next_post', coreHelpers.next_post);
    registerAsyncThemeHelper('pre_post', coreHelpers.pre_post);

    registerThemeHelper('content_no_lazy', coreHelpers.content_no_lazy);
    registerThemeHelper('uuid', coreHelpers.uuid);
    registerThemeHelper('slug', coreHelpers.slug);
    registerThemeHelper('image', coreHelpers.image);
    registerThemeHelper('image_sm', coreHelpers.image_sm);
    registerThemeHelper('type_class', coreHelpers.type_class);
    registerThemeHelper('post_star', coreHelpers.post_star);
    registerThemeHelper('post_desc', coreHelpers.post_desc);
    registerThemeHelper('duoshuo_block', coreHelpers.duoshuo_block);
    registerThemeHelper('author_cover', coreHelpers.author_cover);
    registerThemeHelper('content_lazy', coreHelpers.content_lazy);
    //add end
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerHelpers;
module.exports.registerThemeHelper = registerThemeHelper;
module.exports.registerAsyncThemeHelper = registerAsyncThemeHelper;
module.exports.scriptFiles = utils.scriptFiles;
