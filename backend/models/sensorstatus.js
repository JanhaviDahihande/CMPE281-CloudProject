let mongoose = require('mongoose');

let sensorStatusSchema = mongoose.Schema({
	clusterId:{
		type: Number,
		required: true
	},
	nodeId:{
		type: Number,
		required: true
	},
	sensorId:{
		type: Number,
		required: true
	},
	last_online: {
		type: Date, 
		default: Date.now
	}
});

let SensorStatus = module.exports = mongoose.model('SensorStatus',sensorStatusSchema);