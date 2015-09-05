/// <reference path="./typings/tsd.d.ts" />
 
var gulp = require("gulp"),
    runSequence = require("run-sequence"),
    requireDir = require('require-dir'),
    tasks = requireDir('./tasks');

gulp.task('Build', function (cb) {
    runSequence('Copy:Lib', 'Bundle:App', cb);
});

gulp.task('default', ['Build']);