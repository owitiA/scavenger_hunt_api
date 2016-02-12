module.exports = function ChallengesResource(APIRouter, db) {
  var ChallengesRouter = require('koa-router')();

  /**
   * Returns a list of all challenges available to the requesting user
   * @return {Array} JSON array of challenges
   */
  ChallengesRouter.get('/', function * (next) {
    try {
      this.challenges = yield db.Challenge.filter(this.query).run().then().error();
      this.is('application/json');
      this.body = this.challenges;
    } catch (e) {
      this.status = 401;
      this.body = '';
    }
  });

  ChallengesRouter.get('/:id', function * (next) {
    try {
      this.challenge = yield db.Challenge.filter({ id: this.params.id }).run().then().error();
      this.is('application/json');

      //How do we lock questions?

      this.body = this.challenge;
    } catch (e) {
      this.status = 404;
      this.body = '';
    }

  });

  ChallengesRouter.post('/', function * () {

    var newChallenge = new db.Challenge({
      title: this.request.body.title,
      description: this.request.body.description,
      category: this.request.body.category,
      status: this.request.body.status || 0,
      dateActive: this.request.body.dateActive,
    });

    this.challenge = yield newChallenge.save().then().error();
    this.is('application/json');
    this.body = this.challenge;
  });

  ChallengesRouter.put('/:id', function * () {

    try {
      this.challenge = yield db.Challenge.get(this.params.id).run().then().error();

      this.challenge.title = this.request.body.title;
      this.challenge.description = this.request.body.description;
      this.challenge.category = this.request.body.category;
      this.challenge.status = this.request.body.status || 0;
      this.challenge.dateActive = this.request.body.dateActive;

      this.challenge.saveAll().then().error();

      this.is('application/json');
      this.body = this.challenge;

    } catch (e) {
      this.status = 404;
      this.body = '';
    }

  });

  ChallengesRouter.delete('/:id', function * () {

    try {

      yield db.Challenge.get(this.params.id).then(
        function (challenge) {
          if (challenge ==  null) {
            this.status = 404;
            this.body = '';
          } else {
            challenge.delete().then(function (result) {});
          }
        }).error();

    }  catch (e) {

      this.status = 204;
      this.is('application/json');
      this.body = '';
    }

  });

  // Nest Challenges in API prefix
  APIRouter.use('/challenges', ChallengesRouter.routes());

};
