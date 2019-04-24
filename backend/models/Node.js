const mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const NodeSchema = new mongoose.Schema({
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
NodeSchema.plugin(AutoIncrement, {id:'node_id',inc_field: 'node_id'});
module.exports = mongoose.model('Node', NodeSchema);