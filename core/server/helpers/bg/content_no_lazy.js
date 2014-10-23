/**
 * Created by liuxing on 14-10-22.
 */
var hbs             = require('express-hbs'),
    util            = require('./util'),
    _               = require('lodash');
var contentNoLazy = function (options) {
    var truncateOptions = (options || {}).hash || {};
    truncateOptions = _.pick(truncateOptions, ['words', 'characters']);
    _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
    });

    if (truncateOptions.hasOwnProperty('words') || truncateOptions.hasOwnProperty('characters')) {
        // Due to weirdness in downsize the 'words' option
        // must be passed as a string. refer to #1796
        // TODO: when downsize fixes this quirk remove this hack.
        if (truncateOptions.hasOwnProperty('words')) {
            truncateOptions.words = truncateOptions.words.toString();
        }
        return new hbs.handlebars.SafeString(
            downsize(this.html, truncateOptions)
        );
    }
    this.html = util.addblank(this.html);  //加空格和 「」
    return new hbs.handlebars.SafeString(this.html);
};
module.exports = contentNoLazy;