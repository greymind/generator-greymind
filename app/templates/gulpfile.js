/// <reference path="./typings/tsd.d.ts" />
 
var gulp = require("gulp"),
  runSequence = require("run-sequence"),
  requireDir = require('require-dir'),
  fs = require('fs-extra'),
  nconf = require('nconf'),
  sprintf = require('sprintf-js').sprintf,
  exec = require('child_process').exec,
  chalk = require('chalk'),
  forever = require('forever-monitor'),
  paths = require('./gulp-common.js').Paths,
  EnsureSigInt = require('./gulp-common.js').EnsureSigInt,
  tasks = requireDir('./tasks');

gulp.task('Build', function (done) {
  runSequence(['Compile:Lib', 'Compile:App'], done);
});

gulp.task('Compile:App', function (done) {
  runSequence(['Compile:App:Js', 'Compile:App:Sass'], done);
});

gulp.task('Clean:App', function (done) {
  runSequence(['Clean:App:Js', 'Clean:App:Css'], done);
});

gulp.task('Clean', ['Clean:Server', 'Clean:App', 'Clean:Lib']);

gulp.task('Watch', ['Run:Server'], function (done) {
  EnsureSigInt();
  process.on('SIGINT', function () {
    runSequence(['Clean:Server'], function () { process.exit(0); });
  });

  var Log = function (category, event) {
    console.log(sprintf('[%s] File %s was %s, running task(s)...', chalk.green(category), event.path, event.type));
  }

  gulp.watch([paths.App + "**/*.js"], function (event) {
    Log('App', event);
    runSequence(['Compile:App']);
  });

  gulp.watch([paths.Bower + "**/*.*"], function (event) {
    Log('Bower', event);
    runSequence(['Compile:Lib']);
  });

  gulp.watch([paths.Sass + "**/*.scss"], function (event) {
    Log('Sass', event);
    runSequence(['Compile:App:Sass']);
  });

  gulp.watch([paths.Server + "**/*.*"], function (event) {
    Log('Server', event);
    runSequence(['Run:Server']);
  });

  done();
});

gulp.task('default', ['Build']);