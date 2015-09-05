var lodash = require("lodash"),
    gulp = require("gulp"),
    path = require('path'),
    fs = require('fs-extra'),
    del = require("del"),
    rimraf = require("rimraf"),
    cheerio = require('cheerio'),
    es = require('event-stream'),
    gulpFilter = require('gulp-filter'),
    writeHtml = require('../gulp-common.js').WriteHtml,
    paths = require('../gulp-common.js').Paths;

gulp.task('Clean:Lib', function (cb) {
    rimraf(paths.Lib, cb);
})

gulp.task('Copy:Lib', ['Clean:Lib'], function (cb) {
    var bower = {
        "lodash": "lodash/lodash.js",
        "jquery": "jquery/dist/jquery*.{js,map}",
        "jquery-validation": "jquery-validation/dist/jquery.validate.js",
        "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
        "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,woff2,eot}",
        "hammer.js": "hammer.js/hammer*.{js,map}",
        "angular": "angular/angular*.{js,map}",
        "angular-mocks": "angular-mocks/angular-mocks.js",
        "angular-resource": "angular-resource/angular-resource*.{js,map}",
        "angular-route": "angular-route/angular-route*.{js,map}",
    };

    var bowerPaths = {};

    var indexHtml = paths.Client + 'index.html';

    var $ = cheerio.load(fs.readFileSync(indexHtml));
    var d = $('#data-copy-lib');
    d.empty();

    es.merge(lodash.map(bower, function (moduleFiles, bowerModule) {
        return gulp.src(paths.Bower + moduleFiles)
            .pipe(gulp.dest(paths.Lib + bowerModule))
            .pipe(gulpFilter(['**/*.js', '!**/*.min.js', '!**/npm.js']))
            .pipe(es.map(function (file, cb) {
                var filepath = path.relative(path.resolve(paths.Home), file.path)
                    .split(path.sep)
                    .join(path.posix.sep);

                if (typeof bowerPaths[bowerModule] === 'undefined') {
                    bowerPaths[bowerModule] = [];
                }
                bowerPaths[bowerModule].push("<script src=\"/" + filepath + "\"></script>");

                cb(null, file);
            }));
    })).on('end', function () {
        lodash.forIn(bower, function (moduleFiles, bowerModule) {
            lodash.forEach(bowerPaths[bowerModule], function (scriptTag) {
                d.append(scriptTag);
            });
        });

        writeHtml(indexHtml, $.html(), cb);
    });
});