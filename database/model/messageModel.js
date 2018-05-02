var mongoose = require('mongoose');
var MessageSchema = require('../schema/messageSchema');

var Message = mongoose.model('Message', MessageSchema, 'messages');

module.exports = Message;