var express = require('express');
var router = express.Router();
var User = require('../database/model/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('user', {
		title: '用户管理',
		current: {project: '', message: '', user: 'current'}
	});
});
router.get('/receiverlist', function(req, res, next) {
	var uid = req.query.uid;
	var reg = new RegExp(uid, 'i');
	User.findManyById(reg, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误！'});
		} else {
			res.status(200).json(docs);
		}
	})
})
router.get('/userlist', function(req, res) {
	res.status(200).json({a: 1})
});
module.exports = router;