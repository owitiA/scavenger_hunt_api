var fs = require('fs');
var path = require('path');
var thinky = require('./../utils/thinky');
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var model = file.replace('.js', '').replace(file[0], file[0].toUpperCase());
    db[model] = require(path.join(__dirname, file));
  });

db.thinky = thinky;
db.conn = thinky.conn;
db.r = thinky.r;

module.exports = db;
