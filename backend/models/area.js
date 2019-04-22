let mongoose = require('mongoose');

let areaSchema = mongoose.Schema({
	areaCode:{
		type: Number,
		required: true
	},
	name:{
		type: String,
		required: true
	}
});

let Area = module.exports = mongoose.model('Area',areaSchema);