var express = require('express');
var router = express.Router();
var User = require('../database/model/userModel');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'login' });
});
router.route('/login').get(function(req, res) {
	res.redirect('/');
}).post(function(req, res) {
	var user = req.body;
	User.findByUid(user.username, function(err, doc) {
		if(err) {
			res.status(500).json({err: '网络错误！'});
		} else if(!doc || doc.status === 0) {
			res.status(401).json({err: '未注册！'});
		} else {
			if(user.password != doc.password) {
				res.status(401).json({err: '密码错误！'});
			} else {
				req.session.user = doc;
				res.send(200);
			}
		}
	});
});
router.get('/welcome', function(req, res) {
	res.render('welcome', {
		title: 'login',
		current: {project: 'current', message: '', user: ''}
	});
});

module.exports = router;
