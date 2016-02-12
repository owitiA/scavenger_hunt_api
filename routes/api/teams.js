module.exports = function TeamsResource(APIRouter, db) {
  var TeamsRouter = require('koa-router')();

  /**
   * Returns a list of all teams available to the requesting user
   * @return {Array} JSON array of teams
   */
  TeamsRouter.get('/', function * (next) {

    try {
      this.teams = yield db.Team.filter(this.query).run().then().error();
      this.is('application/json');
      this.body = this.teams;
    } catch (e) {
      this.status = 401;
      this.body = JSON.stringify({ error: e.toString().replace('Error: ', '') });
    }

  });

  /**
   * Returns the team specified
   * @param {String} id ID of the team being requested
   * @return {Object} JSON object of team being requested
   */
  TeamsRouter.get('/:id', function * (next) {
    try {
      this.team = yield db.Team.filter({ id: this.params.id }).run().then().error();
      this.is('application/json');
      this.body = this.team;
    } catch (e) {
      this.status = 404;
      this.body = '';
    }
  });

  TeamsRouter.get('/stats', function * () {
  });

  /**
   * Creates a new team from the parameters passed
   * @return {Object} JSON object of team created
   */
  TeamsRouter.post('/', function * () {

    try {
      var randCode = JSON.stringify(Math.floor(Math.random() * 55343463543 * Math.random()));
      var newTeam = new db.Team({
        name: this.request.body.name,
        members: this.request.body.members,
        tag: this.request.body.tag,
        colour: this.request.body.colour,
        code: randCode,
      });
      this.is('application/json');
      this.team = yield newTeam.save().then().error();
      this.body = this.team;
    } catch (e) {
      this.status = 500;
      this.body = '';
    }

  });

  /**
   * Select challenge a new team from the parameters passed
   * @return {Object} JSON object of team created
   */
  TeamsRouter.post('/challenge', function * () {

    try {
      var randToken = JSON.stringify(Math.floor(Math.random() * 55343463543 * Math.random()).toString().slice(3, 9)); //Use better token generator
      var newTeam = new db.Team({
        name: this.request.body.name,
        members: this.request.body.members,
        tag: this.request.body.tag,
        colour: this.request.body.colour,
        token: randToken,
      });
      this.is('application/json');
      this.team = yield newTeam.save().then().error();
      this.body = this.team;
    } catch (e) {
      this.status = 500;
      this.body = '';
    }

  });

  /**
   * Get challenges available to requesting team
   * @param {String} id ID of team being updated
   */
  TeamsRouter.get('/challenges', function * () {

    try {

      if (typeof this.request.body.category != 'undefined') {

        this.team = yield db.r.table('Challenge').filter(
          db.r.row('attempts')('count').lt(6)
          .and(db.r.row('attempts')('by').contains(this.request.body.team_id))
          .and(db.r.row('category').eq(this.request.body.category.toLowerCase()))
        )
        .run();

      } else {

        console.log(this.request.body.team_id)

        this.team = yield query = db.r.table('Challenge').filter(
          db.r.row('attempts')('count').lt(6)
          .and(db.r.row('attempts')('by').contains(this.request.body.team_id))
        )
        .run();

      }

      this.body = this.team;

    } catch (e) {
      console.log(e);
      this.status = 404;
      this.body = '';
    }

  });

  /**
   * Updates the selected challenge with the team who has selected it
   * @param {String} id ID of team being updated
   */
  TeamsRouter.put('/challenges/:id', function * () {

    try {

      // TODO: Before running update, check count?
      this.team = yield db.r.table('Challenge')
      .filter(
        db.r.row('attempts')('count').lt(6).and(db.r.row('id').eq(this.params.id))
      )
      .update(
        { attempts: {
            count: db.r.row('attempts')('count').default(0).add(1),
            by: db.r.row('attempts')('by').append(this.request.body.team_id),
          },
        }
      ).run();

      this.status = 204;
      this.body = this.team;

    } catch (e) {
      console.log(e);
      this.status = 404;
      this.body = '';
    }

  });

  /**
   * Delete the team specified and returns 204 No Content if delete was successful.
   * If the user does not have access to delete the vehicle, you'll see 403 Forbidden.
   *
   * @param {String} id ID of team being removed from storage.
   * @return {Empty} Returns 204 Status Code
   */
  TeamsRouter.delete('/:id', function * () {

    try {

      yield db.Team.get(this.params.id).then(
        function (team) {
          if (team ==  null) {
            this.status = 404;
            this.body = '';
          } else {
            team.delete().then(function (result) {});
          }
        }).error();

    }  catch (e) {

      this.status = 204;
      this.is('application/json');
      this.body = '';
    }

  });

  // Nest Teams in API prefix
  APIRouter.use('/Teams', TeamsRouter.routes());

};
