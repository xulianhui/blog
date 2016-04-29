var con = require('./db');

function user() {};




user.prototype.save = function( ) {
  //要存入数据库的用户文档
  var user = {
      name: this.name,
      password: this.password,
      email: this.email
  };
  //打开数据库

  console.log('-_-');

  var querystr = 'INSERT INTO user VALUES("' + user.name + '","' + user.password + '","' + user.email + '");';
  // var querystr = 'INSERT INTO user VALUES (7,"W31")';
  // var con = mysql.createConnection(settings);
  var query = con.query(querystr, function(err, result) {
  	console.log(querystr);
    if (err != null) {
      console.log('Error:');
      console.log(err);
    } else {
      console.log(result);
    }
  });
  con.end(); 
};


user.prototype.get = function(name, callback) {
	var querystr = 'select * from user where name = "' + name + '"';
  console.log(querystr);
	con.query(querystr, function(err, result) {
    if (err) callback(err);
		console.log(result);
    user = {
      name: result[0].name,
      password: result[0].password,
      email: result[0].email
    }

    callback(null, user);
	});

  

  con.end();
}

module.exports = user;