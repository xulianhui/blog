// var con = require('./db');
var pools = require('./pools');

var user = function (user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
};

module.exports = user;

user.prototype.save = function(callback) {

  var _user = {
      name: this.name,
      password: this.password,
      email: this.email
  };

  var querystr = 'INSERT INTO user VALUES("' + _user.name + '","' + _user.password + '","' + _user.email + '");';

  pools.getConnection (function(err, con) {
    if (err) {
      console.log('[error]:___');
      console.log(err);
    } else {
      con.query(querystr, function (err, res) {
        console.log('[Query String]: ' + querystr);
        con.release();
        if (err) {
          // console.log('[error]:___');
          // console.log(err);
          return callback(err, null);
        } else {
          callback(null, res);
        }
      }) ;
    }
  });
};

user.get = function(name, callback) {
  var querystr = 'select * from user where name = "' + name + '"';
  pools.getConnection(function (err, con) {
    if (err) {
      console.log('[error]:___');
      console.log(err);
    } else {
      con.query(querystr, function(err, res) {
        console.log(querystr);
        con.release();
        if (err) {
          // console.log('[error]:___');
          // console.log(err);
          return callback(err, null);
        } else {
          console.log('[res]:___');
          console.log(res);
          callback(null, res);
        }
      });
    }
  });
}
