let mongoose = require('mongoose');

let ClusterMetaDataSchema = mongoose.Schema({
	clusterIP:{
		type: String,
		required: true
	},
	clusterId:{
		type: Number,
		required: true
	},
	noOfNodes:{
		type: Number,
		required: true
	},
	zipCode:{
		type: Number,
		required: true
	}
});

let ClusterMetaData = module.exports = mongoose.model('ClusterMetaData',ClusterMetaDataSchema);