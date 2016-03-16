module.exports = function PrizesResource(APIRouter, db) {
  var PrizesRouter = require('koa-router')();

  PrizesRouter.get('/', function * (next) {
    try {
      this.is('application/json');

      this.body = [
        {
          prize_id: 1,
          description: 'Lorem ipsum',
        },
        {
          prize_id: 2,
          description: 'Ipsum asdasd',
        },
        {
          prize_id: 3,
          description: 'ASdIpsum asdasd',
        },
      ];
    } catch (e) {
      this.status = 404;
      this.body = '';
    }

  });

  // Nest Teams in API prefix
  APIRouter.use('/Prizes', PrizesRouter.routes());

};
