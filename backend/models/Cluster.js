const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ClusterSchema = new mongoose.Schema({
  cluster_id: {
    type: String,
    default: ''
  },
  createdTime: {
    type: String,
    default: ''
  },
  ip_address: {
    type: String,
    default: ''
  },
  zipcode: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  }
});
ClusterSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
ClusterSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Cluster', ClusterSchema);