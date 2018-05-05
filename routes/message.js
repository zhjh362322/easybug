var express = require('express');
var router = express.Router();
var Message = require('../database/model/messageModel');

router.get('/', function(req, res) {
	var user = req.session.user;
	Message.fetch({'$or':[{owner: user._id}, {receiver: user._id, draft: 0}]}, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误!'});
		} else {
			res.render('message', {
				title: 'message',
				current: {project: '', message: 'current', user: ''},
				msgs: docs
			});
		}
	})
});
router.get('/updatestatus', function(req, res) {
	var q = req.query;
	var conditions = {_id: q.msgid};
	var updates;
	if(typeof q.star == 'string') {
		updates = {'$set': {star: q.star}};
	} else if(typeof q.box == 'string') {
		updates = {'$set': {box: q.box}};
	}
	Message.update(conditions, updates, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误！'})
		}else {
			res.send(200);
		}
	})
})
router.get('/msginfo', function(req, res) {
	var q = req.query;
	Message.findId(q.msgid, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误！'})
		}else {
			res.status(200).json(docs);
		}
	})
})
router.get('/delete', function(req, res, next) {
	var q = req.query;
	var id = q['_id']
	Message.remove({_id: id}, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误！'})
		}else {
			res.send(200);
		}
	})
})
router.get('/:name', function(req, res, next) {
	var user = req.session.user;
	var rote = req.params.name;
	var obj;
	if(rote == 'starmsg') {
		obj = {'$or':[{owner: user._id}, {receiver: user._id}], star: 'current'};
	} else if(rote == 'inbox') {
		obj = {receiver: user._id, draft: 0};
	} else if( rote == 'outbox') {
		obj = {owner: user._id, draft: 0};
	} else if (rote == 'draft') {
		obj = {owner: user._id, draft: 1};
	}
	Message.findByRote(obj, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误!'});
		} else {
			res.render('message', {
				title: 'message',
				current: {project: '', message: 'current', user: ''},
				msgs: docs
			});
		}
	})
});

router.post('/newmsg', function(req, res, next) {
	var formData = req.body;
	var message = new Message(formData);
	message.save(function(err, doc) {
		if(err) {
			res.status(500).json({err: '网络错误！'})
		} else {
			res.send(200);
		}
	});
});
router.post('/editmsg', function(req, res, next) {
	var formData = req.body;
	var conditions = {_id: formData._id};
	delete formData._id;
	Message.update(conditions, formData, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误！'})
		}else {
			res.send(200);
		}
	});
});

module.exports = router;