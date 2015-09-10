var lodash = require("lodash"),
    gulp = require("gulp"),
    path = require('path'),
    fs = require('fs-extra'),
    del = require("del"),
    rimraf = require("rimraf"),
    cheerio = require('cheerio'),
    es = require('event-stream'),
    gulpFilter = require('gulp-filter'),
    sprintf = require('sprintf-js').sprintf,
    writeHtml = require('../gulp-common.js').WriteHtml,
    paths = require('../gulp-common.js').Paths;

gulp.task('Clean:Lib', function (cb) {
    rimraf(paths.Lib, cb);
})

gulp.task('Copy:Lib', ['Clean:Lib'], function (cb) {
    var bower = {
        "lodash": "lodash/lodash.js",
        "sprintf": "sprintf/dist/sprintf.min.js",
        "moment": "moment/moment.js",
        "jquery": "jquery/dist/jquery*.{js,map}",
        "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,woff2,eot}",
        "hammer.js": "hammer.js/hammer*.{js,map}",
        "angular": "angular/angular*.{js,map}",
        "angular-mocks": "angular-mocks/angular-mocks.js",
        "angular-resource": "angular-resource/angular-resource*.{js,map}",
        "angular-route": "angular-route/angular-route*.{js,map}",
        "angular-recaptcha": "angular-recaptcha/release/angular-recaptcha.min.js"
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
                bowerPaths[bowerModule].push(sprintf("<script src=\"/%s\"></script>", filepath));

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