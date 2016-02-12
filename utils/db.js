module.exports.rethinkdb = {};
/*
 * Create a RethinkDB connection, and save it in req._rdbConn
 */
module.exports.rethinkdb.createConnection = function *(next) {
  try {
    var conn = yield r.connect(config.rethinkdb);
    this._rdbConn = conn;
  }
  catch (err) {
    this.status = 500;
    this.body = err.message || http.STATUS_CODES[this.status];
  }

  yield next;
};

/*
 * Close the RethinkDB connection
 */
module.exports.rethinkdb.closeConnection = function *(next) {
  this._rdbConn.close();
};
