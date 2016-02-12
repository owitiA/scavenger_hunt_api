module.exports = function (app, db, auth) {

  // Cross Origin Resource Sharing (CORS)
  var cors = require('koa-cors');
  var whitelist = ['http://localhost:1109', 'http://localhost:8000'];
  app.use(cors({
    credentials: true,
    origin: function (origin, c) {
      var originIsWhitelisted = whitelist.indexOf(origin.header.host) !== -1;
      return true;
    },
  }));

  // Namespaced API Router
  var APIRouter = require('koa-router')({ prefix: '/api/v1', });

  // API Routes
  require('./routes/index')(APIRouter);
  require('./routes/api/challenges')(APIRouter, db);
  require('./routes/api/teams')(APIRouter, db);
  require('./routes/api/leaderboard')(APIRouter, db);

  // Tell app to use routes
  app
    .use(APIRouter.routes())
    .use(APIRouter.allowedMethods());

};
