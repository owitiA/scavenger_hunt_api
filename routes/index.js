module.exports = function(apirouter) {

  var testRouter = require('koa-router')();

  testRouter.get('/', function *(next) {
    this.body = 'Hello';
  });

  testRouter.get('/:id', function *(next) {
    this.body = 'Hello ' + this.params.id;
  });

  apirouter.use('/test', testRouter.routes());
};
