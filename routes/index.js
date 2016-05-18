var express = require('express');
var crypto = require('crypto');
var user = require('../modules/user');
var post = require('../modules/post')

var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.user);

  var name = '';
  if (req.session.user == null) {
    name = null;
  } else {
    name = req.session.user.name;
  }
  post.get(name, function (err, _post) {
    if (err) {
      _post = [];
    }
    console.log('[_post]:___');
    console.log(_post);
    res.render('index', {
      title: 'Index',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString(),
      posts: _post
    });

  });

});

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res) {
  res.render('reg', {
    title: 'Regist',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/reg', checkNotLogin);
router.post('/reg', function(req, res) {
  console.log('reg: ------------------');
  var name = req.body.name;
  var password = req.body.password;
  var password_rep = req.body['password-repeat'];
  var email = req.body.email;

  if (password != password_rep) {
    console.log('error ' + '两次输入的密码不一致!');
    req.flash('error', '两次输入的密码不一致!');
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
      req.session.user = newUser;
      console.log('[session]:___');
      console.log(req.session.user);
      console.log('regist success!');
      res.redirect('/');
    });
  });
});

router.get('/login', checkNotLogin);
router.get('/login', function(req, res) {
  res.render('login', {
    title: 'Login',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/login', checkNotLogin);
router.post('/login', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  user.get(name, function (err, _user) {
    if (err) {
      console.log('[error]:___');
      console.log(err);
    } else if (_user == '[]') {
      console.log('[user]:___');
      console.log(_user);
      req.flash('error', 'no such user');
      return res.redirect('/login');
    } else {
      if (_user.password != password) {
        req.flash('error', 'password error');
        return res.redirect('/login');
      }
      req.session.user = _user;
      req.flash('success', 'Successfuly login');
      return res.redirect('/');
    }
  });
});

router.get('/post', checkLogin);
router.get('/post', function(req, res) {
	res.render('post', {
    title: 'Post',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/post', checkLogin);
router.post('/post', function(req, res) {
  var _user = req.session.user;
  var _post = new post({
    name: _user.name,
    title: req.body.title,
    post: req.body.post
  });

  _post.save(function(err, result) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', '发布成功!');
    res.redirect('/');
  });
});

router.get('/logout', checkLogin);
router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success', 'Successfuly logout');
  res.redirect('/');
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Please login first');
    res.redirect('/login');
  }
  next();
};

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', 'You have logged');
    res.redirect('back');
  }
  next();
}

module.exports = router;
