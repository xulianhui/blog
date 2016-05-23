var pools = require('./pools');
var moment = require('moment');
var markdown = require('markdown').markdown;

var post = function (post) {
  this.name = post.name;
  this.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  this.title = post.title;
  this.post = post.post;
};

module.exports = post;

post.prototype.save = function(callback) {

  var _post = {
    name: this.name,
    time: this.time,
    title: this.title,
    post: this.post
  }

  var querystr = 'insert into post values("' +
                  _post.name + '","' +
                  _post.time + '","' +
                  _post.title + '","' +
                  _post.post + '")';

  pools.getConnection(function(err, con) {
    if (err) {
      console.log(err);
    } else {
      con.query(querystr, function(err, res) {
        con.release();
        if (err) {
          return callback(err, null);
        } else {
          callback(null, res);
        }
      });
    }
  });
};

post.getall = function(name, callback) {
  console.log('name: ' + name);
  var querystr = 'select * from post'
  if (name != null) querystr += ' where name = "' + name + '"';
  console.log(querystr);
  pools.getConnection(function(err, con) {
    if (err) {
      console.log(err);
    } else {
      con.query(querystr, function(err, docs) {
        if (err) {
          return callback(err, null);
        } else {
          docs.forEach(function(doc) {
            doc.post = markdown.toHTML(doc.post);
          });
          callback(null, docs);
        }
      });
    }
  });
}

post.getone = function(name, title, callback) {
  // console.log(name + ' ' + time + ' ' + titile);
  var querystr = 'select * from post where name = "' + name + '" and title = "' + title + '"';
  console.log(querystr);

  pools.getConnection(function(err, con) {
    if (err) console.log(err);
    else {
      con.query(querystr, function (err, doc) {
        if (err) callback(err, null);console.log('-_-');
        console.log(doc);
        var _post = {
          name: doc[0].name,
          time: doc[0].time,
          title: doc[0].title,
          post: doc[0].post
        };
        _post.post = markdown.toHTML(_post.post);
        callback(null, _post);
      });
    }
  });
}
