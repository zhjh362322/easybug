var mongoose = require('mongoose');
var ProjectSchema = require('../schema/projectSchema');
var Project = mongoose.model('Project', ProjectSchema, 'project');
module.exports = Project;