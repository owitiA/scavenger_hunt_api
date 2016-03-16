module.exports = function (app, db, auth) {

  // Cross Origin Resource Sharing (CORS)
  var cors = require('koa-cors');
  var whitelist = ['http://localhost:1109', 'http://localhost:8000'];

  // app.use(cors({
  //   credentials: true,
  //   origin: function (origin, c) {
  //     // var originIsWhitelisted = whitelist.indexOf(origin.header.host) !== -1;
  //     return true;
  //   },
  // }));

  app.use(cors({ credentials:false, origin: '*' }));

  // Namespaced API Router
  var APIRouter = require('koa-router')({ prefix: '/api/v1', });

  var Token = require('./utils/token');

  // API Routes
  require('./routes/index')(APIRouter);
  require('./routes/api/challenges')(APIRouter, db);
  require('./routes/api/teams')(APIRouter, db, Token);
  require('./routes/api/leaderboard')(APIRouter, db);
  require('./routes/api/prizes')(APIRouter, db);

  // Tell app to use routes
  app
    .use(APIRouter.routes())
    .use(APIRouter.allowedMethods());

};
