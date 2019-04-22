let mongoose = require('mongoose');

let locationSchema = mongoose.Schema({
	id:{
		type: Number,
		required: true
	},
	zipCode:{
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

let Location = module.exports = mongoose.model('Location',locationSchema);