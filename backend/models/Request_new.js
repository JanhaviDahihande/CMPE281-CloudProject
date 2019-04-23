const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const newRequestSchema = new mongoose.Schema({
  name :{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  user_id: {
    type: String,
    default: ''
  },
  zip_code: {
    type: String,
    default: ''
  },
  no_of_nodes: {
    type: Number,
    default: 0
  },
  new_cluster: {
    type: String,
    default: ''
  },
  latlong: {
    type: Array,
    default: []
  },
},
{ timestamps: true },);

module.exports = mongoose.model('Request_new', newRequestSchema);