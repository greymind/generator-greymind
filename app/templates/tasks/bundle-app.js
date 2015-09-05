var lodash = require("lodash"),
    gulp = require("gulp"),
    path = require('path'),
    fs = require('fs-extra'),
    cheerio = require('cheerio'),
    es = require('event-stream'),
    writeHtml = require('../gulp-common.js').WriteHtml,
    paths = require('../gulp-common.js').Paths;

gulp.task('Bundle:App', function (cb) {
    var indexHtml = paths.Client + 'index.html';

    var $ = cheerio.load(fs.readFileSync(indexHtml));
    var d = $('#data-bundle-app');
    d.empty();

    gulp.src([
        paths.App + "factories/**/*.js",
        paths.App + "**/*.controller.js"
    ], { base: paths.Home })
        .pipe(es.map(function (file, cb) {
            var filepath = path.relative(file.base, file.path)
                .split(path.sep)
                .join(path.posix.sep);

            d.append("<script src=\"/" + filepath + "\"></script>");

            cb(null, file);
        }))
        .pipe(es.wait(function (err, body) {
            writeHtml(indexHtml, $.html(), cb);
        }));
})