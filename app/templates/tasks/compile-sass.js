var lodash = require("lodash"),
  gulp = require("gulp"),
  del = require('del'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  paths = require('../gulp-common.js').Paths;

gulp.task('Clean:App:Css', function (done) {
  del([paths.DistApp + "*.css*"], done);
});

gulp.task('Compile:App:Sass', ['Clean:App:Css'], function () {
  return gulp.src([paths.Sass + '**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(sass.sync({ style: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.DistApp))
    .pipe(rename('app.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.DistApp));
});
