const mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const ClusterSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: ''
  },
  ipAddr: {
    type: String,
    default: ''
  },
  areaCode: {
    type: String,
    default: ''
  },
  cluster_name: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true });
ClusterSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
ClusterSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
ClusterSchema.plugin(AutoIncrement, {id:'cluster_id',inc_field: 'cluster_id'});
module.exports = mongoose.model('Cluster', ClusterSchema);