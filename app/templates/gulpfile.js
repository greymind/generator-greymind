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
    tasks = requireDir('./tasks');

gulp.task('Build', function (cb) {
    runSequence(['Compile:Lib', 'Compile:App'], cb);
});

gulp.task('Compile:App', function (cb) {
    runSequence(['Compile:App:Js', 'Compile:App:Sass'], cb);
});

gulp.task('Clean', ['Clean:Server'], function () { });

gulp.task('Watch', ['Run:Server'], function (cb) {
    gulp.watch([paths.App + "**/*.js"], function (event) {
        console.log(sprintf('[%s] File %s was %s, recompiling...', chalk.green('App'), event.path, event.type));
        gulp.start(['Compile:App']);
    });

    gulp.watch([paths.Bower + "**/*.*"], function (event) {
        console.log(sprintf('[%s] File %s was %s, recompiling...', chalk.green('Bower'), event.path, event.type));
        gulp.start(['Compile:Lib']);
    });

    gulp.watch([paths.Sass + "**/*.scss"], function (event) {
        console.log(sprintf('[%s] File %s was %s, recompiling...', chalk.green('Sass'), event.path, event.type));
        gulp.start(['Compile:App:Sass']);
    });

    gulp.watch([paths.Server + "**/*.*"], function (event) {
        console.log(sprintf('[%s] File %s was %s, restarting...', chalk.green('Server'), event.path, event.type));
        gulp.start(['Run:Server']);
    });
});

gulp.task('default', ['Build']);