var config = require('../config/database');
var thinky = require('thinky')(config.rethinkdb);
var r = thinky.r;

var Team = thinky.createModel('Team', {
  name: String,
  tag: String,
  colour: String,
  icon: String, //Icon URL
  token: String,
  members: [
    {
      name: String,
      id: Number,
      telephone: String,
    },
  ],
  dateRegistered: {
    _type: Date,
    default: r.now(),
  },
});

Team.docAddListener('save', function (team) {
  console.log('A new attendee has been saved');
});

// Validation
Team.pre('save', function (next) {
  if (typeof this.members === 'undefined') {
    throw new Error('A team must have at least one member');
    next();
  } else if (this.members.length > 3) {
    throw new Error('A team cannot have more than three members');
    next();
  } else if (this.members.length < 1) {
    new Error('A team must have at least one member');
    next();
  } else {
    next();
  }
});

// Attendees.ensureIndex('email');

module.exports = Team;
