var lodash = require('lodash'),
  mongo = require('mongodb'),
  moment = require('moment'),
  nconf = require('nconf');

var Client = mongo.MongoClient,
  ObjectId = mongo.ObjectID;

nconf.env(['mongodb:connection'])
  .file('api/config.json');

var uri = nconf.get('mongodb:connection');
var allow = !nconf.get('RunningOnIISNode');

var Allowed = function (req) {
  return allow || req.hostname === '<local>.azurewebsites.net';
}

var _configMode = nconf.get('config-mode');

module.exports.GetAll = function (req, res) {
  if (!Allowed(req)) {
    res.sendStatus(403);
  };

  Client.connect(uri, function (err, db) {
    if (_configMode) {
      nconf.load();
      res.send(nconf.get('items'));
    }
    else {
      db.collection('items')
        .find({}, { "Name": 1, "TimeStamp": 1 })
        .sort({ "TimeStamp": -1 })
        .toArray(function (err, docs) {
          nconf.set('items', docs);
          nconf.save();
          res.send(docs);
        });
    }
  });
};

module.exports.Post = function (req, res) {
  if (!Allowed(req)) {
    return res.sendStatus(403);
  };

  Client.connect(uri, function (err, db) {
    if (err) return res.sendStatus(500);

    var itemDefaults = {
      Name: '',
      TimeStamp: moment().format()
    };

    var item = lodash.merge(itemDefaults, req.body);

    if (!item.Name) {
      return res.sendStatus(400);
    }

    if (_configMode) {
      var items = nconf.get('items');
      items.unshift(item);
      nconf.set('items', items);
      nconf.save();
      res.sendStatus(201);
    }
    else {
      db.collection('items')
        .insert(item, function (err, result) {
          if (err) return res.sendStatus(400);
          res.sendStatus(201);
        });
    }
  });
};