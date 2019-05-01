const mongoose = require("mongoose");
let AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
const NodeSchema = new mongoose.Schema({
  cluster_id: {
    type: String,
    default: ""
  },
  latitude: {
    type: String,
    default: ""
  },
  longitude: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: false
  },
  ip: {
    type: String,
    default: ""
  },
  port: {
    type: String,
    default: ""
  }
},
{ timestamps: true });

NodeSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
NodeSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
NodeSchema.plugin(AutoIncrement, { id: "node_id", inc_field: "node_id" });
module.exports = mongoose.model("Node", NodeSchema);
