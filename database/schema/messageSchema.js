var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	star: {
		type: String,
		default: ''
	},
	box: {
		type: String,
		default: ''
	},
	title: String,
	detail: String,
	// 发件人
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	// 收件人
	receiver: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	draft: {
		type: Number,
		default: 0
	}
});

MessageSchema.statics = {
	fetch: function(owner, cb) {
		return this.find(owner)
			.populate('owner receiver', 'uid -_id')
			.exec(cb);
	},
	// 按不同路由参数查找
	findByRote: function(obj, cb) {
		return this.find(obj)
			.populate('owner receiver', 'uid -_id')
			.exec(cb);
	},
	findId: function(_id, cb) {
		return this.findById(_id)
			.populate('owner receiver', 'uid _id')
			.exec(cb);
	},
	updateById: function(_id, data, cb) {
		return this.update({_id: _id}, data)
			.exec(cb);
	}
};

module.exports = MessageSchema;