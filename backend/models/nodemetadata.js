let mongoose = require('mongoose');

let NodeMetaDataSchema = mongoose.Schema({
	nodeIP:{
		type: String,
		required: true
	},
	nodeId:{
		type: Number,
		required: true
	},
	noOfSensors:{
		type: Number,
		required: true
	},
	latitude:{
		type: Number,
		required: true
	},
	longitude:{
		type: Number,
		required: true
	}
});

let NodeMetaData = module.exports = mongoose.model('NodeMetaData',NodeMetaDataSchema);