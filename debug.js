var user = require('./modules/user.js');

var ad = new user();
ad.get('xuelanghu', function (err, user) {
	if (err) console.log(err);
	console.log('-_-');
	console.log(user.password);
});
