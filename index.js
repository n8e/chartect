var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

var config = require('./server/config'),
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  routes = require('./server/routes'),
  app = express();

// connect to the db when app initialises
mongoose.connect(config[env].database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server connected to the database.');
  }
});

// load env variables from .env file in development environment
// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, './public')));


routes(app, config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send(err.message);
    next();
  });
}


var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on %d, in %s' +
    ' mode', server.address().port, app.get('env'));
});

module.exports = app;