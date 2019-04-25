let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let farmerRequestSchema = mongoose.Schema({
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
},
{ timestamps: true });
farmerRequestSchema.plugin(AutoIncrement, {id:'requestId',inc_field: 'requestId'});
let FarmerRequest = module.exports = mongoose.model('FarmerRequest',farmerRequestSchema);