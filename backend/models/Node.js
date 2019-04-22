const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const NodeSchema = new mongoose.Schema({
  node_id: {
    type: String,
    default: ''
  },
  createdTime: {
    type: String,
    default: ''
  },
  cluster_id: {
    type: String,
    default: ''
  },
  location_id: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  }
});

NodeSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
NodeSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Node', NodeSchema);