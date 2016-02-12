
module.exports = function authresource(APIRouter, db, leaderboard) {

  var LeaderboardRouter = require('koa-router')();

  LeaderboardRouter.get('/', function * (next) {
    //Get leaderboard
  });

  APIRouter.use('/leaderboard', LeaderboardRouter.routes());
};
