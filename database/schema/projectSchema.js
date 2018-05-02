var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
	no: {
		type: String,
		default: new Date().getTime()
	},
	type: String,
	title: String,
	detail: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createDate: {
		type: Date,
		default: Date.now()
	},
	status: String
});


ProjectSchema.statics = {
	fetch: function(owner, cb) {
		return this.find(owner)
			.populate('owner', 'uid _id')
			.exec(cb);
	},
	countByDate: function(date, cb) {
		return this.find(date)
			.count()
			.exec(cb);
	},
	findByType: function(type, cb) {
		return this.find({type: type})
			.exec(cb);
	},
	findByDate: function(date, cb) {
		return this.find({createDate: {'$get': date}})
			.exec(cb);
	},
	removeById: function(_id, cb) {
		return this.remove({_id, _id})
			.exec(cb);
	}
};
module.exports = ProjectSchema;
