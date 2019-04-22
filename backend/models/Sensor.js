const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SensorSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    default: ''
  },
  createdTime: {
    type: String,
    default: ''
  },
  node_id: {
    type: String,
    default: ''
  },
  cluster_id: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  last_online: {
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
module.exports = mongoose.model('Sensor', SensorSchema);