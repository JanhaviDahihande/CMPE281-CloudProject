const mongoose = require("mongoose");
let AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
const SensorDataSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    default: ""
  },
  createdTime: {
    type: String,
    default: ""
  },
  node_id: {
    type: String,
    default: ""
  },
  cluster_id: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  },
  last_online: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: false
  }
});
// SensorSchema.plugin(AutoIncrement, { id: "sensor_id", inc_field: "sensor_id" });
module.exports = mongoose.model("SensorData", SensorDataSchema);
