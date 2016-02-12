module.exports = function (app) {

  var path = require('path');
  var logger = require('koa-logger');
  var fs = require('fs');
  var hbs = require('koa-hbs');
  var body = require('koa-parse-json');

  // setup the logger and only log errors
  var logger = require('koa-logger');
  var accessLogStream = fs.createWriteStream('scavenger_hunt.log', {
    flags: 'a',
  });
  app.use(logger('combined', { stream: accessLogStream, }));

  // Body parser
  app.use(body());

  // view engine setup
  app.use(hbs.middleware({
    viewPath: __dirname + '/views',
  }));

  // redis session config
  // var config = require('./config/database');

  // TODO: check env then set appropriate error handlers
  // app.use(errorhandler({
  //   dumpExceptions: true,
  //   showStack: true,
  // }));

  // Models
  var db = require('./models');

  // Auth Util

  // initialize passport

  // Initialize auth - with (app, db) ?

  //Routes
  require('./router')(app, db);

};
