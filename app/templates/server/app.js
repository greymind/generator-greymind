var express = require('express'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  monitoring = require('./api/monitoring.js'),
  items = require('./api/items.js'),
  gRecaptcha = require('./api/g-recaptcha.js');

var app = express();

if (process.env.RunningOnIISNode == "True") {
  app.get('/', function (req, res) {
    fs.readFile('../client/index.html', 'utf8', function (err, text) {
      res.send(text);
    });
  });
}
else {
  app.use('/client', function (req, res, next) {
    req.url = req.url.split('/client/')
      .join('/');
    res.redirect(req.url);
  });

  app.use('/', express.static('client'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Monitoring and keep-alive
app.get('/api/monitoring', monitoring.Get);

// Items API
app.get('/api/items', items.GetAll);
app.post('/api/items', items.Post);

// Recaptcha
app.get('/api/g-recaptcha', gRecaptcha.Get);

// Error handlers
app.use(LogErrors);
app.use(ClientErrorHandler);
app.use(ErrorHandler);

function LogErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function ClientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500)
      .send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function ErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500)
    .render('error', { error: err });
}

var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server app listening at http://%s:%s', host, port);
});