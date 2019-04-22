let mongoose = require('mongoose');

let farmerRequestSchema = mongoose.Schema({
	requestId:{
		type: Number,
		required: true
	},
	userId:{
		type: Number,
		required: true
	},
	newCluster:{
		type: String,
		required: true
	},
	latitude:{
		type: Number,
		required: true
	},
	longitude:{
		type: Number,
		required: true
	},
	status:{
		type: String,
		required: true
	}
});

let FarmerRequest = module.exports = mongoose.model('FarmerRequest',farmerRequestSchema);