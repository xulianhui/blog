var mysql = require('./db.js');

function User (user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;

User.save = function(callback) {
  //要存入数据库的用户文档
  var user = {
      name: this.name,
      password: this.password,
      email: this.email
  };
  //打开数据库

  var querystr = 'INSERT INTO user VALUES ("' + user.name + '","' + user.password + '","' + user.email + '"")';
  mysql.query(querystr, function(err, result) {
  	console.log(result);
  }); 
};


User.get = function(name, callback) {
	var querystr = 'select * from user where name = ' + name;

	var user = User;	

	mysql.query(querystr, function(err, result) {

	});
}

mysql.end();
// var query = con.query('INSERT INTO user VALUES (125,"Dlz")', function(err, result) {
//   // Neat!
//   console.log(result);
// });