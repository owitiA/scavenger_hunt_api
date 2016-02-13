var config = require('../config/database');
var thinky = require('thinky')(config.rethinkdb);
var r = thinky.r;

// id is email
var Challenge = thinky.createModel('Challenge', {
  title: String,
  description: String,
  category: String,
  status: Number,
  attempts: {
    by: [String],
    count: Number,
  },
  type: String,
  answer: String,
  dateActive: {
    _type: Date,
  },
  dateCreated: {
    _type: Date,
    default: r.now(),
  },
});

Challenge.docAddListener('save', function (team) {
  console.log('A new challenge has been saved');
});

// Attendees.ensureIndex('email');

module.exports = Challenge;
