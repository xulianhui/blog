var mysql = require('mysql');
var settings = require('./settings');

var pools = mysql.createPool(settings);

module.exports = pools;
// module.exports = router;
