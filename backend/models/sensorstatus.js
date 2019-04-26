const mongoose = require('mongoose');

const SensorStatusSchema = new mongoose.Schema({
	clusterId:{
		type: String,
		default: ""
	},
	nodeId:{
		type: String,
		default: ""
	},
	sensorId:{
		type: String,
		default: ""
	},
	sensorType:{
		type: String,
		default: ""
	},
	status:{
		type: Boolean,
    	default: false
	},
	last_online: {
		type: Date, 
		default: Date.now
	}
});
module.exports = mongoose.model("SensorStatus",SensorStatusSchema);
