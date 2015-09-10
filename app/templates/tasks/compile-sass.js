var lodash = require("lodash"),
  gulp = require("gulp"),
  path = require('path'),
  fs = require('fs-extra'),
  del = require("del"),
  es = require('event-stream'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  writeHtml = require('../gulp-common.js').WriteHtml,
  paths = require('../gulp-common.js').Paths;

gulp.task('Clean:App:Css', function (cb) {
  del([paths.DistApp + "*.css*"], cb);
});

gulp.task('Compile:App:Sass', function () {
  gulp.src([paths.Sass + '**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(sass.sync({ style: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.DistApp))
    .pipe(rename('app.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.DistApp));
});
