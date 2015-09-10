/// <reference path="./typings/tsd.d.ts" />
 
var gulp = require("gulp"),
    runSequence = require("run-sequence"),
    requireDir = require('require-dir'),
    sprintf = require('sprintf-js').sprintf,
    exec = require('child_process').exec,
    chalk = require('chalk'),
    paths = require('./gulp-common.js').Paths,
    tasks = requireDir('./tasks');

gulp.task('Build', function (cb) {
    runSequence('Compile:Lib', 'Compile:App', cb);
});

gulp.task('Compile:App', ['Clean:App:Js', 'Clean:App:Css'], function (cb) {
    runSequence(['Compile:App:Js', 'Compile:App:Sass'], cb);
});

gulp.task('Watch', function (cb) {
    // When files are added or removed here:
    // paths.App + "**/*.js"
    // Compile:Js
    
    // When files are added or removed here:
    // paths.Bower + "**/*.js"
    // Copy:Lib
    
    // When files are added, removed or changed here:
    // paths.Sass + "**/*.sass"
    // Compile:Sass (should this also update index.html with css references?)
    
    // When files are added, removed or changed here:
    // paths.Server + "**/*.*"
    // Restart server
    exec('node server/app.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

    gulp.watch([paths.Sass + "**/*.sass", paths.Bower + "**/*.*", paths.App + "**/*.js"], function (event) {
        console.log(sprintf('File %s was %s, running tasks...', event.path, event.type));
        gulp.run('Build');
    });
});

gulp.task('default', ['Build']);