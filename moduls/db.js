var mysql      = require('mysql');
var settings   = require('./settings');
var connection = mysql.createConnection(settings);
module.exports = connection;