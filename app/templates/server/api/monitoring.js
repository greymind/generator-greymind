var nconf = require('nconf'),
  sprintf = require('sprintf-js').sprintf,
  https = require('https');

module.exports.Get = function (req, res) {
  res.send({ status: 'Ok' });
};