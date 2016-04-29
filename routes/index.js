var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/reg', function(req, res) {
	res.render('reg', {title: 'Regist'});
});

router.post('/reg', function(req, res) {

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
