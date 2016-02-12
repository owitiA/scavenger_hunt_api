
module.exports = function authresource(APIRouter) {

  var testRouter = require('koa-router')();

  testRouter.get('/', function * (next) {
      this.body = 'Hello';
    });

  testRouter.get('/:id', function * (next) {
      this.body = 'Hello ' + this.params.id;
    });

  APIRouter.use('/test', testRouter.routes());
};
