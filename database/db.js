var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/easybug');

var db = mongoose.connection;
db.on('connected', function() {
	console.log('mongoose default connection open to :' + '127.0.0.1:27017/easybug');
});
db.on('error', function(err) {
	console.log('mongoose连接错误： ' + err);
});
db.on('disconnected', function() {
	console.log('mongoose没有连接上')
});
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('mongoose disconnected');
		process.exit(0);
	})
});

module.exports = mongoose;