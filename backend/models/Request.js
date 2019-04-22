const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const RequestSchema = new mongoose.Schema({
  zip_code: {
    type: String,
    default: ''
  },
  createdTime: {
    type: String,
    default: ''
  },
  no_of_nodes: {
    type: Number,
    default: 0
  },
  latlong: {
    type: Array,
    default: []
  },
});

module.exports = mongoose.model('Request', RequestSchema);