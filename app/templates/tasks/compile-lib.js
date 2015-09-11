var lodash = require("lodash"),
    gulp = require("gulp"),
    path = require('path'),
    fs = require('fs-extra'),
    del = require('del'),
    rimraf = require('rimraf'),
    runSequence = require("run-sequence"),
    es = require('event-stream'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    sprintf = require('sprintf-js').sprintf,
    paths = require('../gulp-common.js').Paths;

gulp.task('Clean:Lib', function (done) {
    rimraf(paths.DistLib, done);
});

var Source = function (path) {
    return sprintf("%s%s", paths.Bower, path);
}

gulp.task('Compile:Lib:Js', function () {
    return gulp.src([
        Source('lodash/lodash.min.js'),
        Source('sprintf/dist/sprintf.min.js'),
        Source('moment/min/moment.min.js'),
        Source('jquery/dist/jquery.min.js'),
        Source('bootstrap/dist/js/bootstrap.min.js'),
        Source('hammer.js/hammer.min.js'),
        Source('angular/angular.min.js'),
        Source('angular-route/angular-route.min.js'),
        Source('angular-resource/angular-resource.min.js'),
        Source('angular-animate/angular-animate.min.js'),
        Source('angular-recaptcha/release/angular-recaptcha.min.js'),
        Source('angular-mocks/angular-mocks.js'),
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(paths.DistLib))
        .pipe(rename('lib.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.DistLib));
});

gulp.task('Compile:Lib:Css', function () {
    return gulp.src([
        Source('bootstrap/dist/css/bootstrap.min.css'),
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('lib.css'))
        .pipe(sass.sync({ style: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.DistLib))
        .pipe(rename('lib.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.DistLib));
});

gulp.task('Compile:Lib:Fonts', function () {
    return gulp.src([
        Source('bootstrap/dist/fonts/glyphicons-halflings-regular.{css,ttf,svg,woff,woff2,eot}'),
    ])
        .pipe(gulp.dest(paths.DistLib + 'fonts/'));
});

gulp.task('Compile:Lib', ['Clean:Lib'], function (done) {
    runSequence(['Compile:Lib:Js', 'Compile:Lib:Css', 'Compile:Lib:Fonts'], done);
});