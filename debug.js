var user = require('./moduls/user.js');

var ad = new user();
// {
// 	name: 'Dlz',
// 	password: '345678',
// 	email: 'Dlz@123.com'
// }
// ad.save();

ad.get('xuelanghu', function (err, user) {
	if (err) console.log(err);
	console.log('-_-');
	console.log(user.password);
})