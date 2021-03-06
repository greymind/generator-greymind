var lodash = require("lodash"),
  gulp = require("gulp"),
  sprintf = require('sprintf-js').sprintf,
  chalk = require('chalk'),
  nconf = require('nconf'),
  forever = require('forever-monitor'),
  paths = require('../gulp-common.js').Paths;

// Server stuff
nconf.file('tmp/forever.json');
var server = null;

var StartForever = function () {
  // Start forever
  server.start();
                
  // Save foreverPid and pid to tmp file
  nconf.set('child-pid', server.data.pid);
  nconf.save();
}

var CleanServer = function (done) {
  if (!server) {
    // We should look for pids from temp file to clean up previously aborted run
    var childPid = nconf.get('child-pid');

    // If forever is already running, shut it down
    forever.kill(childPid);

    // Reset pids
    nconf.set('child-pid', 0);
    nconf.save();

    // Callback
    if (done) done();
  }
  else {
    // Just cleanly stop the server!
    if (server.data.running) {
      server.stop()
        .once('stop', function () {
          // Reset pids
          nconf.set('child-pid', 0);
          nconf.save();
          
          // Callback
          if (done) done();
        });
    }
    else {
      // Callback
      if (done) done();
    }
  }
}

gulp.task('Clean:Server', function (done) {
  CleanServer(done);
});

gulp.task('Run:Server', ['Clean:Server'], function (done) {
  // If first run
  if (!server) {
    // Initialize forever
    server = new (forever.Monitor)('app.js', {
      sourceDir: 'server/',
      watch: false,
      killTree: true
    });
        
    // Set up catch on stderr
    server.on('stderr', function (data) {
      server.stop()
        .once('stop', function (process) {
          console.log(sprintf('[%s] Stopping server due to error. Waiting for changes to attempt restart...', chalk.red('STDERR')));
        });
    });
  }

  // Go!
  StartForever();

  // Callback
  done();
});