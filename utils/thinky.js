var config = require('./../config/database');
var thinky = require('thinky')(config.rethinkdb);
thinky.conn = config.rethinkdb;

module.exports = thinky;
