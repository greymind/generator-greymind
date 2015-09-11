var lodash = require("lodash"),
    gulp = require("gulp"),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    sprintf = require('sprintf-js').sprintf,
    paths = require('../gulp-common.js').Paths;

gulp.task('Clean:App:Js', function (done) {
    del([paths.DistApp + "*.js*"], done);
});

gulp.task('Compile:App:Js', ['Clean:App:Js'], function () {
    return gulp.src([
        paths.App + "app.js",
        paths.App + "services/**/*.js",
        paths.App + "directives/**/*.js",
        paths.App + "**/*.controller.js"
    ], { base: paths.Home })
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.DistApp))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.DistApp));
})