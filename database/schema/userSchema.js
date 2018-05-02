var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	uid: {
		type: String,
		required: true
	},
	password: {
		type: String,
		default: 'a123456'
	},
	name: String,
	level: Number,
	status: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});
// 前后钩子(中间件) pre、post。pre：执行某些操作前，post：执行某些操作前最后执行的方法
// 执行下列操作时可设置钩子：save、remove、find、findOne、update、insert、init...
UserSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.updateAt = this.meta.createAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

UserSchema.statics = {
	// find、findOne、remove、update...都是model的方法
	fetch: function(cb) {
	// find、findOne
	// find第一个参数：查询条件，二：控制查找结果，三：输出控制skip、sort、limit等，四：回调函数。
	// 回调函数也可以用 .exec(cb) 调用。  只有第三个函数时，一、二不能省略，可以用null
		return this.find({}, {meta: 0})
			.sort('meta.createAt')
			.exec(cb);
	},
	findByUid: function(uid, cb) {
		return this.findOne({uid: uid}, {meta: 0})
			.exec(cb);
	},
	findById: function(_id, cb) {
		return this.findOne({_id: _id}, {meta: 0, password: 0})
			.exec(cb);
	},
	removeMany: function(_ids, cb) {
		// remove、findOneAndRemove、findByIdAndRemove
		// remove(conditions, [callback])
		return this.remove({_id: {$in: _ids}})
			.exec(cb);
	},
	updateById: function(_id, doc, cb) {
		// update、updateMany、updateOne、findOneAndUpdate、findByIdAndUpdate、find+save
		// update(conditions, doc, [options], [callback])
		// conditions：查询条件, doc：可能是部分文档，或者整个文档
		// options：如配置更新多条记录({multi:true}).
		// 更新多个文档也可以用updateMany
		return this.update({_id: _id}, doc)
			.exec(cb);
	},
	findManyById: function(uid, cb) {
		return this.find({uid: uid})
			.exec(cb);
	}
}

module.exports = UserSchema;