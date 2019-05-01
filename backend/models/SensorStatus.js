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
	sensorType:{
		type: String,
		required: true
	},
	status:{
		type: Boolean,
		required: true
	},
	last_online: {
		type: Date, 
		required: true
	}
});
module.exports = mongoose.model('SensorStatus',sensorStatusSchema);
