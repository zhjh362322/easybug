var express = require('express');
var router = express.Router();
var User = require('../database/model/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
module.exports = router;