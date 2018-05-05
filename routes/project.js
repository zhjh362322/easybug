var express = require('express');
var router = express.Router();
var Project = require('../database/model/projectModel');

var weekFirstDay = showWeekFirstDay();
router.get('/', function(req, res, next) {
	var user = req.session.user;
	var type = req.query.type ? req.query.type : null;
	var conditions = {type: type};
	var cur1 = type == 1 ? 'current' : '';
	var cur0 = type == 0 ? 'current' : '';
	Project.fetch({owner: user._id}, function(err, docs) {
		if(err) {
			res.status(500).json({err: '网络错误！'});
		} else {
			var data = weekData(docs, weekFirstDay);
			var list = filterDocs(conditions, docs);
			format(list);
			res.render('project', {
				title: '任务管理',
				current: {project: 'current', message: '',user: ''},
				list: [
					{name: '需求管理', cur: cur1, icon: 'demand', href: '/project?type=1'},
					{name: 'BUG汇总', cur: cur0, icon: 'bug', href: '/project?type=0'}
				],
				contents: list,
				weekData: data
			});

		}
	});
});
router.get('/delete', function(req, res, next) {
	var _id = req.query._id;
	Project.removeById(_id, function(err, rst) {
		if(err) {
			res.status(500).json({err: '网络错误！'});
		} else {
			res.redirect('/project')
		}
	})
})
// router.get('/demand', function(req, res, next) {

// 	res.render('project', {
// 		title: '任务管理',
// 		current: {project: 'current', message: ''},
// 		list: [
// 			{name: '需求管理', icon: 'inbox', href: '/project/demand'},
// 			{name: 'BUG汇总', icon: 'drafts', href: '/project/bug'}
// 		],
// 		contents: list,
// 		weekData: data
// 	});
// })
router.post('/add', function(req, res, next) {
	var user = req.session.user;
	var formData = req.body;
	var project = new Project(formData);

	var todayString = new Date().toLocaleDateString();
	var today = new Date(todayString);
	var obj = {owner: user._id, createDate: {'$gte': today}};
	Project.countByDate(obj, function(err, count) {
		project.no = formData.type == 0 ? 'B' + (count + 1) : 'D' + (count + 1);
		project.save(function(err, doc) {
			if(err) {
				res.status(500).json({err: '网络错误！'});
			} else {
				res.redirect('/project');
			}
		})
	})

})
// 格式化数据，日期用moment格式化。
// 数据库为Number时，这个格式化方法无效？？？？？？？
function format(docs) {
	return docs.map(function(item, index) {
		item.type = item.type == 1 ? '需求' : 'BUG';
		item.status = item.status == 1 ? '已完成' : '进行中';
	})
}
// 获取本周第一天，以便统计本周数据
function showWeekFirstDay() {
    var Nowdate = new Date();
    var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() -1 ) * 86400000);
    var M = Number(WeekFirstDay.getMonth()) + 1
    return WeekFirstDay.getFullYear() + "-" + M + "-" + WeekFirstDay.getDate();
}
// 本周数据统计
function weekData(docs, weekFirstDay) {
	var firstDay = new Date(weekFirstDay);
	var data = new Array();
	var total = 0;
	var unDone = 0;
	for(var i in docs) {
		var doc = docs[i];
		if(doc.createDate >= firstDay) {
			total++;
			if(doc.status == 0) {
				unDone++;
			}
		}
	}
	data[0] = total;
	data[1] = unDone;
	return data;
}
function filterDocs(conditions, docs) {
	var type = conditions.type;
	if(!type) {
		return docs;
	}

	var demands = [];
	var bugs = [];
	for(var i in docs) {
		var doc = docs[i];
		if(doc.type == 1) {
			demands.push(doc);
		} else {
			bugs.push(doc);
		}
	}
	if(type == 0) {
		return bugs;
	} else {
		return demands;
	}
}
module.exports = router;