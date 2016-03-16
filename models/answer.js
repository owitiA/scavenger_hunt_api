var config = require('../config/database');
var thinky = require('thinky')(config.rethinkdb);
var r = thinky.r;

var Answer = thinky.createModel('Answer', {
  team: String,
  answer: String, //Icon URL
  challenge: String,
  dateAnswered: {
    _type: Date,
    default: r.now(),
  },
});

Answer.docAddListener('save', function (team) {
  console.log('A challenge has been answered');
});

module.exports = Answer;
