// Core Dependencies
var koa = require('koa');
var app = module.exports = koa();

//Load Environment Specific Details
require('dotenv').load();

//Bootstrap the App
var bootstrap = require('./bootstrap')(app, koa);
app.listen(process.env.PORT || 8000);

console.log('App listening on: ' + process.env.PORT || 8000);
