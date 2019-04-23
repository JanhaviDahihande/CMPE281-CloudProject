let mongoose = require('mongoose');

let SensorMetaDataSchema = mongoose.Schema({
	sensorId:{
		type: Number,
		required: true
	},
	sensorType:{
		type: String,
		required: true
	},
	status:{
		type: Boolean,
		required: true
	}
});

let SensorMetaData = module.exports = mongoose.model('SensorMetaData',SensorMetaDataSchema);