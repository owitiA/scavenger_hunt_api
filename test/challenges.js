var app = require('./../app');
var request = require('supertest').agent(app.listen());
var db = require('./../models');
var co = require('co');

var testChallenge = { title:'Test Challenge', description:'This is a sample description' };

describe('Challenges API: ', function () {

  it('creates a new challenge', function (done) {
    //Post
    request
      .post('/api/v1/challenges')
      .send(testChallenge)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('gets an existing challenge', function (done) {
    co(function * () {

      //Insert test user into database
      var newChallenge = new db.Challenge(testChallenge);
      var challenge = yield newChallenge.save().then().error();
      var challengeUrl = '/api/v1/challenges/' + challenge.id;

      //GET
      request
        .get(challengeUrl)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(/Test Challenge/)
        .expect(/This is a sample description/)
        .expect(200, done);
    });
  });

  it('updates a challenge', function (done) {
    co(function * () {

      var newChallenge = new db.Challenge(testChallenge);
      var challenge = yield newChallenge.save().then().error();
      var challengeUrl = '/api/v1/challenges/' + challenge.id;

      var updatedChallenge = { title:'Updated Test Challenge', description:'[Updated] This is a sample description' };

      //PUT
      request
        .put(challengeUrl)
        .send(updatedChallenge)
        .expect('Content-Type', /json/)
        .expect(/Updated Test Challenge/)
        .expect(/[Updated] This is a sample description/)
        .expect(200)
        .end(done);

    });

    done();

  });

  it('deletes a challenge', function (done) {
    co(function * () {
      var newChallenge = new db.Challenge(testChallenge);
      var challenge = yield newChallenge.save().then().error();
      var challengeUrl = '/api/v1/challenges/' + challenge.id;

      var updatedChallenge = { title:'Updated Test Challenge', description:'[Updated] This is a sample description' };

      //PUT
      request
        .del(challengeUrl)
        .expect(204)
        .end(done);

    });

    done();
  });

});
