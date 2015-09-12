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
    process.on('SIGINT', function () {
        runSequence(['Clean:Server'], function () { process.exit(0); });
    });

    gulp.watch([paths.App + "**/*.js"], function (event) {
        console.log(sprintf('[%s] File %s was %s, recompiling...', chalk.green('App'), event.path, event.type));
        runSequence(['Compile:App']);
    });

    gulp.watch([paths.Bower + "**/*.*"], function (event) {
        console.log(sprintf('[%s] File %s was %s, recompiling...', chalk.green('Bower'), event.path, event.type));
        runSequence(['Compile:Lib']);
    });

    gulp.watch([paths.Sass + "**/*.scss"], function (event) {
        console.log(sprintf('[%s] File %s was %s, recompiling...', chalk.green('Sass'), event.path, event.type));
        runSequence(['Compile:App:Sass']);
    });

    gulp.watch([paths.Server + "**/*.*"], function (event) {
        console.log(sprintf('[%s] File %s was %s, restarting...', chalk.green('Server'), event.path, event.type));
        runSequence(['Run:Server']);
    });

    done();
});

gulp.task('default', ['Build']);