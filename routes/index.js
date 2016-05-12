var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var user = require('../modules/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/reg', function(req, res) {
	res.render('reg', {title: 'Regist'});
});

router.post('/reg', function(req, res) {
  console.log('reg: ------------------');
  var name = req.body.name;
  var password = req.body.password;
  var password_rep = req.body['password-repeat'];
  var email = req.body.email;

  if (password != password_rep) {
    console.log('error ' + '两次输入的密码不一致!');
    req.flash('error', err);
    return res.redirect('/reg');
  }

  var newUser = new user({
    name: name,
    password: password,
    email: email
  });

  console.log("name: " + name);

  user.get(name, function(err, user) {
    if (err) {
      console.log('[error]:____ ');
      console.log(err);
      return res.redirect('/');
    }
    if (user == '[]') {
      console.log('[user]:___');
      console.log(user);
      return res.redirect('/reg');
    }
    newUser.save(function(err, user) {
      if (err) {
        console.log('[error]:____ ');
        console.log(err);
      }
      console.log('regist success!');
      res.redirect('/');
    });
  });
});

router.get('/login', function(res, req) {
	req.render('login', {title: 'Login'});
});

router.post('/login', function(res, req) {

});

router.get('/post', function(res, req) {
	res.render('post', {title: 'Post'});
});

router.post('/post', function(res, req) {
});

router.get('/logout', function(res, req) {
});
module.exports = router;
